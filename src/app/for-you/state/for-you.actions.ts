import { Recommendation } from './../../models/recommendation.models';
import { Action } from '@ngrx/store';

export enum ForYouActionTypes {
  LoadForYou = '[For you] Load for you',
  LoadForYouSuccess = '[For you] Load for you success',
  LoadForYouFailure = '[For you] Load for you failure',

  LoadRecommendation = '[For you] Load recommendation',
  LoadRecommendationSuccess = '[For you] Load recommendation success',
  LoadRecommendationFailure = '[For you] Load recommendation failure',
}

export class LoadForYou implements Action {
  readonly type = ForYouActionTypes.LoadForYou;
}

export class LoadForYouSuccess implements Action {
  readonly type = ForYouActionTypes.LoadForYouSuccess;
  constructor(public payload: { recommendations: Recommendation[] }) { }
}

export class LoadForYouFailure implements Action {
  readonly type = ForYouActionTypes.LoadForYouFailure;
  constructor(public payload: { error: any }) { }
}

export class LoadRecommendation implements Action {
  readonly type = ForYouActionTypes.LoadRecommendation;
  constructor(public payload?: {id: string, offset?: string}) { }
}

export class LoadRecommendationSuccess implements Action {
  readonly type = ForYouActionTypes.LoadRecommendationSuccess;
  constructor(public payload: {recommendation: Recommendation}) { }
}

export class LoadRecommendationFailure implements Action {
  readonly type = ForYouActionTypes.LoadRecommendationFailure;
  constructor(public payload: { error: any }) { }
}



export type ForYouActions = 
LoadForYou |
LoadForYouSuccess |
LoadForYouFailure |
LoadRecommendation |
LoadRecommendationSuccess |
LoadRecommendationFailure
;

