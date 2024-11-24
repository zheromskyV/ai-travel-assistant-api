import { Application } from 'jsr:@oak/oak/application';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { Router } from '@oak/oak/router';
import { apiRouter } from '@api/api-router.ts';
import { errorHandler } from '@api/middleware/errors.ts';

if (import.meta.main) {
  const app = new Application();

  const router = new Router();
  router.use('/api', apiRouter.routes());

  app.use(errorHandler);
  app.use(oakCors());
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen({ port: +Deno.env.get('PORT')! || 8080 });
}
