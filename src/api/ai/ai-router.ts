import { Router } from '@oak/oak/router';
import { getRecommendations } from './recommendations.ts';

export const aiRouter = new Router();

aiRouter.post('/recommendations', getRecommendations);
