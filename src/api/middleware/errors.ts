import type { Context } from '@oak/oak/context';
import { isHttpError } from '@oak/commons/http_errors';
import { Status, STATUS_TEXT } from '@oak/commons/status';

export async function errorHandler(
  ctx: Context,
  next: () => Promise<unknown>,
): Promise<void> {
  try {
    await next();
  } catch (err) {
    console.error('[errorHandler]', err);

    let status = Status.InternalServerError;
    if (isHttpError(err)) {
      status = err.status;
    }

    ctx.response.status = status;
    ctx.response.body = STATUS_TEXT[status];
  }
}
