import type { RouterContext } from '@oak/oak/router';
import type { GetRecommendationsReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { SessionKey, setToSession } from '@utils/session.ts';
import { processChatResponse } from './process-chat-response.ts';

export async function getRecommendations(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetRecommendationsReq>(ctx);

  const { id } = await ai.createThread();
  await setToSession(ctx, SessionKey.Thread, id);

  for (const { question, answer } of req.questionnaire) {
    await ai.sendMessage(id, 'assistant', question);
    await ai.sendMessage(id, 'user', answer);
  }

  const chat = ai.createChat(id, Deno.env.get('AI_RECOMMENDATIONS')!);

  await processChatResponse(ctx, req, chat);
}
