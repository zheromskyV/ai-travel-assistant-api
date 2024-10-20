import { Router } from '@oak/oak/router';
import { aiRouter } from './ai/ai-router.ts';

export const apiRouter = new Router();

apiRouter.use('/ai', aiRouter.routes());
