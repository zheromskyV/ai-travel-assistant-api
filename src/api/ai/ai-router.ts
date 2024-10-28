import { Router } from '@oak/oak/router';
import { getRecommendations } from './recommendations.ts';
import { recognizeLocation } from './location-recognition.ts';
import { compareRecommendations } from './compare-recommendations.ts';
import { getItinerary } from './itinerary.ts';
import { getItineraryBudget } from './itinerary-budget.ts';

export const aiRouter = new Router();

aiRouter.post('/recommendations', getRecommendations);
aiRouter.post('/recommendations/compare', compareRecommendations);

aiRouter.post('/itinerary', getItinerary);
aiRouter.post('/itinerary/budget', getItineraryBudget);

aiRouter.post('/location-recognition', recognizeLocation);
