import { Router } from '@oak/oak/router';
import { aiRouter } from './ai/ai-router.ts';
import { checkKey } from './middleware/check-key.ts';
import { sessionHandler } from './middleware/session.ts';

export const apiRouter = new Router();

apiRouter.use(checkKey);
apiRouter.use(sessionHandler);

apiRouter.use('/ai', aiRouter.routes());
