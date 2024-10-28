import type { RouterContext } from '@oak/oak/router';
import type { GetItineraryBudgetReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { getFromSession, SessionKey } from '@utils/session.ts';
import { Status } from '@oak/commons/status';
import { processChatResponse } from './process-chat-response.ts';

export async function getItineraryBudget(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetItineraryBudgetReq>(ctx);

  const id = await getFromSession(ctx, SessionKey.Thread);

  if (!id) {
    ctx.throw(Status.BadRequest, `[getItineraryBudget] No ${SessionKey.Thread} found`);
  }

  const chat = ai.createChat(id, Deno.env.get('AI_BUDGET')!);

  await processChatResponse(ctx, req, chat);
}
