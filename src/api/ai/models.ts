import type { BaseReq } from '@api/model.ts';

export interface GetRecommendationsReq extends BaseReq {
  questionnaire: {
    question: string;
    answer: string;
  }[];
}

export interface GetCompareRecommendationsReq extends BaseReq {}

export interface GetItineraryReq extends BaseReq {
  choice: string;
}

export interface GetItineraryBudgetReq extends BaseReq {}

export interface GetLocationRecognitionReq {
  image: string; // base64
}
