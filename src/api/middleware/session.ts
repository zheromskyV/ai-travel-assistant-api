import { createSession, getSession } from '@utils/session.ts';
import type { Context } from '@oak/oak/context';

export async function sessionHandler(ctx: Context, next: () => Promise<unknown>) {
  if (!await getSession(ctx)) {
    await createSession(ctx);
  }

  await next();
}
