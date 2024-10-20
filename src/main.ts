import { Application } from 'jsr:@oak/oak/application';
import { Router } from '@oak/oak/router';
import { apiRouter } from '@api/api-router.ts';

if (import.meta.main) {
  const app = new Application();

  const router = new Router();
  router.use('/api', apiRouter.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen({ port: +Deno.env.get('PORT')! || 8080 });
}
