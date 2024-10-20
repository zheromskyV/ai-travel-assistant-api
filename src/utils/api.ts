import type { RouterContext } from '@oak/oak/router';

export function getReqBody<T>(ctx: RouterContext<string>): Promise<T> {
  return ctx.request.body.json();
}
