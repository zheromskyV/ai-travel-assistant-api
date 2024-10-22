import { Router } from '@oak/oak/router';
import { getRecommendations } from './recommendations.ts';
import { recognizeLocation } from './location-recognition.ts';

export const aiRouter = new Router();

aiRouter.post('/recommendations', getRecommendations);
// aiRouter.post('/recommendations/compare', compareRecommendations);
// aiRouter.post('/itinerary', getRecommendations);
// aiRouter.post('/budget', getRecommendations);
aiRouter.post('/location-recognition', recognizeLocation);
