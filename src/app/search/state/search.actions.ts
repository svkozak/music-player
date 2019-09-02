import { Recommendation } from './../../models/recommendation.models';
import { Action } from '@ngrx/store';

export enum SearchActionTypes {
  SearchCatalog = '[Search] Search Catalog',
  SearchCatalogSuccess = '[Search] Search Catalog Success',
  SearchCatalogFailure = '[Search] Search Catalog Failure',

  SearchLibrary = '[Search] Search Library',
  SearchLibrarySuccess = '[Search] Search Library Success',
  SearchLibraryFailure = '[Search] Search Library Failure',

  SearchClear = '[Search] Clear Search'
}

export class SearchCatalog implements Action {
  readonly type = SearchActionTypes.SearchCatalog;
  constructor(public payload: { term: string, offset?: string, limit?: string }) { }
}

export class SearchCatalogSuccess implements Action {
  readonly type = SearchActionTypes.SearchCatalogSuccess;
  constructor(public payload: { searchResults: any }) { }
}

export class SearchCatalogFailure implements Action {
  readonly type = SearchActionTypes.SearchCatalogFailure;
  constructor(public payload: { error: any }) { }
}

export class SearchLibrary implements Action {
  readonly type = SearchActionTypes.SearchLibrary;
  constructor(public payload: { term: string, offset?: string, limit?: string }) { }
}

export class SearchLibrarySuccess implements Action {
  readonly type = SearchActionTypes.SearchLibrarySuccess;
  constructor(public payload: { searchResults: any }) { }
}

export class SearchLibraryFailure implements Action {
  readonly type = SearchActionTypes.SearchLibraryFailure;
  constructor(public payload: { error: any }) { }
}


export class SearchClear implements Action {
  readonly type = SearchActionTypes.SearchClear;
}




export type SearchActions = 
SearchCatalog |
SearchCatalogSuccess |
SearchCatalogFailure |
SearchLibrary |
SearchLibrarySuccess |
SearchLibraryFailure |
SearchClear
;

