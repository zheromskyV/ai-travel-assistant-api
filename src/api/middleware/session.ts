import type { RouterContext } from '@oak/oak/router';
import { createSession, getSession } from '@utils/session.ts';

export async function sessionHandler(ctx: RouterContext<string>, next: () => Promise<unknown>) {
  if (!await getSession(ctx)) {
    await createSession(ctx);
  }

  await next();
}
