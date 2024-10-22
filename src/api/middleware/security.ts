import type { RouterContext } from '@oak/oak/router';

export async function securityHandler(
  ctx: RouterContext<string>,
  next: () => Promise<unknown>,
): Promise<void> {
  const key = ctx.request.headers.get('X-Api-Key') ?? '';

  if (key === Deno.env.get('X_API_KEY')) {
    await next();
  } else {
    ctx.response.status = 401;
  }
}
