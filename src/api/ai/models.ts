import type { BaseReq } from '@api/model.ts';

export interface GetRecommendationsReq extends BaseReq {
  questionnaire: {
    question: string;
    answer: string;
  }[];
}

export interface GetLocationRecognitionReq {
  image: string; // base64
}
