import type { RouterContext } from '@oak/oak/router';
import type { GetCompareRecommendationsReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { getFromSession, SessionKey } from '@utils/session.ts';
import { Status } from '@oak/commons/status';
import { processChatResponse } from './process-chat-response.ts';

export async function compareRecommendations(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetCompareRecommendationsReq>(ctx);

  const id = await getFromSession(ctx, SessionKey.Thread);

  if (!id) {
    ctx.throw(Status.BadRequest, `[compareRecommendations] No ${SessionKey.Thread} found`);
  }

  const chat = ai.createChat(id, Deno.env.get('AI_COMPARE')!);

  await processChatResponse(ctx, req, chat);
}
