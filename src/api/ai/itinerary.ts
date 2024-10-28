import type { RouterContext } from '@oak/oak/router';
import type { GetItineraryReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { getFromSession, SessionKey, setToSession } from '@utils/session.ts';
import { processChatResponse } from './process-chat-response.ts';
import { Status } from '@oak/commons/status';

export async function getItinerary(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetItineraryReq>(ctx);
  const { choice } = req;

  if (!choice) {
    ctx.throw(Status.BadRequest, `[getItinerary] "choice" is required but not provided`);
  }

  let id = await getFromSession(ctx, SessionKey.Thread);

  if (!id) {
    const newThread = await ai.createThread();
    id = newThread.id;
    await setToSession(ctx, SessionKey.Thread, id);
  }

  await ai.sendMessage(id, 'user', req.choice);

  const chat = ai.createChat(id, Deno.env.get('AI_ITINERARY')!);

  await processChatResponse(ctx, req, chat);
}
