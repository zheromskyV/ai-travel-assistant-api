import type { RouterContext } from '@oak/oak/router';
import type { GetRecommendationsReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { TextEncoderStream } from 'node:stream/web';
import { SessionKey, setToSession } from '@utils/session.ts';

const aiRecommendationsAssistant = Deno.env.get('AI_RECOMMENDATIONS')!;

export async function getRecommendations(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetRecommendationsReq>(ctx);

  const { id } = await ai.createThread();
  await setToSession(ctx, SessionKey.Thread, id);

  for (const { question, answer } of req.questionnaire) {
    await ai.sendMessage(id, 'assistant', question);
    await ai.sendMessage(id, 'user', answer);
  }

  const chat = ai.createChat(id, aiRecommendationsAssistant);

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
