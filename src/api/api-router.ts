import { Router } from '@oak/oak/router';
import { aiRouter } from './ai/ai-router.ts';
import { checkKey } from './middleware/check-key.ts';

export const apiRouter = new Router();

apiRouter.use(checkKey);

apiRouter.use('/ai', aiRouter.routes());
