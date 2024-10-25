import type { RouterContext } from '@oak/oak/router';
import type { GetCompareRecommendationsReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { TextEncoderStream } from 'node:stream/web';
import { getFromSession, SessionKey } from '@utils/session.ts';

export async function compareRecommendations(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetCompareRecommendationsReq>(ctx);

  const id = await getFromSession(ctx, SessionKey.Thread);

  if (!id) {
    ctx.response.status = 400;
    return;
  }

  const chat = ai.createChat(id, Deno.env.get('AI_COMPARE')!);

  if (req.streamResponse) {
    const sseTarget = await ctx.sendEvents();

    chat
      .on('textDelta', ({ value }) => sseTarget.dispatchMessage(value))
      .on('textDone', () => sseTarget.close());
  } else {
    const stream = new TextEncoderStream();
    const writer = stream.writable.getWriter();

    chat.on('textDone', async ({ value }) => {
      await writer.ready;
      await writer.write(value);
      writer.releaseLock();
      await stream.writable.close();
    });

    ctx.response.body = stream.readable;
  }

  await chat;
}
