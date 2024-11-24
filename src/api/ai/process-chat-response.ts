import type { RouterContext } from '@oak/oak/router';
import type { BaseReq } from '@api/model.ts';

// openai::AssistantStream
interface Chat {
  on(e: string, fn: (p: { value: string }) => void): Chat;
}

function wrapValue(str: string): string {
  return str.replaceAll(' ', '&nbsp;');
}

export async function processChatResponse(
  ctx: RouterContext<string>,
  { streamResponse }: BaseReq,
  chat: Chat,
): Promise<void> {
  if (streamResponse) {
    const sseTarget = await ctx.sendEvents();

    await chat
      .on('textDelta', ({ value }) => sseTarget.dispatchMessage(wrapValue(value)))
      .on('textDone', () => sseTarget.close());
  } else {
    const stream = new TextEncoderStream();
    const writer = stream.writable.getWriter();

    await chat.on('textDone', async ({ value }) => {
      await writer.ready;
      await writer.write(value);
      writer.releaseLock();
      await stream.writable.close();
    });

    ctx.response.body = stream.readable;
  }
}
