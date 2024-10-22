import { Router } from '@oak/oak/router';
import { aiRouter } from './ai/ai-router.ts';
import { securityHandler } from './middleware/security.ts';
import { sessionHandler } from './middleware/session.ts';

export const apiRouter = new Router();

apiRouter.use(securityHandler);
apiRouter.use(sessionHandler);

apiRouter.use('/ai', aiRouter.routes());
