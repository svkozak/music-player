import { Playlist } from 'src/app/models/playlist.model';
import { Activity } from './../../models/activity.model';
import { Artist } from '../../models/artist.model';
import { Album } from '../../models/album.model';
import { Action } from '@ngrx/store';

export enum BrowseActionTypes {
  LoadCatalogArtist = '[Browse] Load Catalog Artist',
  LoadCatalogArtistSuccess = '[Browse] Load Catalog Artist Success',
  LoadCatalogArtistFailure = '[Browse] Load Catalog Artist Failure',

  LoadActivity = '[Browse] Load Activity',
  LoadActivitySuccess = '[Browse] Load Activity Success',
  LoadActivityFailure = '[Browse] Load Activity Failure',

  LoadActivities = '[Browse] Load Activities',
  LoadActivitiesSuccess = '[Browse] Load Activities Success',
  LoadActivitiesFailure = '[Browse] Load Activities Failure',
  
  LoadActivityPlaylists = '[Browse] Load Activity Playlists',
  LoadActivityPlaylistsSuccess = '[Browse] Load Activity Playlists Success',
  LoadActivityPlaylistsFailure = '[Browse] Load Activity Playlists Failure'

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

export class LoadActivity implements Action {
  readonly type = BrowseActionTypes.LoadActivity;
  constructor(public payload?: { id: string }) { }
}

export class LoadActivitySuccess implements Action {
  readonly type = BrowseActionTypes.LoadActivitySuccess;
  constructor(public payload?: { selectedActivity: Activity }) { }
}

export class LoadActivityFailure implements Action {
  readonly type = BrowseActionTypes.LoadActivityFailure;
  constructor(public payload?: { error: any }) { }
}

export class LoadActivities implements Action {
  readonly type = BrowseActionTypes.LoadActivities;
}

export class LoadActivitiesSuccess implements Action {
  readonly type = BrowseActionTypes.LoadActivitiesSuccess;
  constructor(public payload?: { activities: Activity[] }) { }
}

export class LoadActivitiesFailure implements Action {
  readonly type = BrowseActionTypes.LoadActivitiesFailure;
  constructor(public payload?: { error: any }) { }
}

export class LoadActivityPlaylists implements Action {
  readonly type = BrowseActionTypes.LoadActivityPlaylists;
  constructor(public payload?: { playlists: Playlist[] }) { }
}

export class LoadActivityPlaylistsSuccess implements Action {
  readonly type = BrowseActionTypes.LoadActivityPlaylistsSuccess;
  constructor(public payload?: { playlists: Playlist[] }) { }
}

export class LoadActivityPlaylistsFailure implements Action {
  readonly type = BrowseActionTypes.LoadActivityPlaylistsFailure;
  constructor(public payload?: { error: any }) { }
}

export type BrowseActions = 
LoadCatalogArtist | 
LoadCatalogArtistSuccess | 
LoadCatalogArtistFailure |
LoadActivities |
LoadActivitiesSuccess |
LoadActivitiesFailure |
LoadActivityPlaylists |
LoadActivityPlaylistsSuccess |
LoadActivityPlaylistsFailure |
LoadActivity |
LoadActivitySuccess |
LoadActivityFailure
;

