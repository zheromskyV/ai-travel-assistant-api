import type { Context } from '@oak/oak/context';
import { Status } from '@oak/commons/status';

export async function securityHandler(
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> {
  const key = ctx.request.headers.get('X-Api-Key') ?? '';

  if (key === Deno.env.get('X_API_KEY')) {
    await next();
  } else {
    ctx.throw(Status.Forbidden, `[securityHandler] key "${key}" is invalid`);
  }
}
