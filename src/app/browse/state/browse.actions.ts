import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';

export enum BrowseActionTypes {
  LoadCatalogArtist = '[Browse] Load Catalog Artist',
  LoadCatalogArtistSuccess = '[Browse] Load Catalog Artist Success',
  LoadCatalogArtistFailure = '[Browse] Load Catalog Artist Failure'
}

// Artist actions

export class LoadCatalogArtist implements Action {
  readonly type = BrowseActionTypes.LoadCatalogArtist;
  constructor(public payload: { id: string }) { }
}

export class LoadCatalogArtistSuccess implements Action {
  readonly type = BrowseActionTypes.LoadCatalogArtistSuccess;
  constructor(public payload: { artist: Artist }) { }
}

export class LoadCatalogArtistFailure implements Action {
  readonly type = BrowseActionTypes.LoadCatalogArtistFailure;
  constructor(public payload: { error: any }) { }
}

export type BrowseActions = LoadCatalogArtist | LoadCatalogArtistSuccess | LoadCatalogArtistFailure;

