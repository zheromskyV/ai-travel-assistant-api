import type { RouterContext } from '@oak/oak/router';
import type { GetRecommendationsReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { SessionKey, setToSession } from '@utils/session.ts';
import { processChatResponse } from './process-chat-response.ts';
import { Status } from '@oak/commons/status';

export async function getRecommendations(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetRecommendationsReq>(ctx);
  const { questionnaire } = req;

  if (!questionnaire) {
    ctx.throw(
      Status.BadRequest,
      `[getRecommendations] "questionnaire" is required but not provided`,
    );
  }

  const { id } = await ai.createThread();
  await setToSession(ctx, SessionKey.Thread, id);

  for (const { question, answer } of questionnaire) {
    await ai.sendMessage(id, 'assistant', question);
    await ai.sendMessage(id, 'user', answer);
  }

  const chat = ai.createChat(id, Deno.env.get('AI_RECOMMENDATIONS')!);

  await processChatResponse(ctx, req, chat);
}
