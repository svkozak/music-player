import { LibraryActionTypes, LoadLibraryPlaylistSuccess, LoadLibraryArtistsSuccess } from './library.actions';
import { Album } from './../../models/album.model';
import { Action } from '@ngrx/store';
import { ApiServiceService } from './../../services/api-service.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import * as libraryActions from './library.actions';
import * as appActions from '../../state/app.actions';



@Injectable()
export class LibraryEffects {

  constructor(private actions$: Actions, private api: ApiServiceService) {}

  // albums 

  @Effect()
  loadLibraryAlbums$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryAlbums>(LibraryActionTypes.LoadLibraryAlbums),
    map(action => action.payload ? action.payload.offset : '0'),
    mergeMap(offset => this.api.getAllLibraryAlbums('', offset.toString())
      .pipe(
        map(albums => new libraryActions.LoadLibraryAlbumsSuccess({albums: albums})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadLibraryAlbum$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryAlbum>(LibraryActionTypes.LoadLibraryAlbum),
    map(action => action.payload.id),
    mergeMap(id => this.api.getLibraryAlbum(id).pipe(
      map(album => new libraryActions.LoadLibraryAlbumSuccess({album: album}))
    ))
  )

  // playlists

  @Effect()
  loadLibraryPlaylists$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryPlaylists>(LibraryActionTypes.LoadLibraryPlaylists),
    map(action => action.payload ? action.payload.offset : '0'),
    mergeMap(offset => this.api.getAllLibraryPlaylists('', offset.toString())
      .pipe(
        map(playlists => new libraryActions.LoadLibraryPlaylistsSuccess({playlists: playlists})),
        catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadLibraryPlaylist$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryPlaylist>(LibraryActionTypes.LoadLibraryPlaylist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getLibraryPlaylist(id).pipe(
      map(playlist => new libraryActions.LoadLibraryPlaylistSuccess({playlist: playlist})),
      catchError(err => of(new libraryActions.LoadLibraryPlaylistFailure({error: err})))
    ))
  )
  
  // recently added

  @Effect()
  loadRecentlyAdded$ = this.actions$.pipe(
    ofType(LibraryActionTypes.LoadRecentlyAdded),
    mergeMap(() => this.api.getRecentlyAdded()
    .pipe(
      map(items => new libraryActions.LoadRecentlyAddedSuccess({recentlyAddedItems: items})),
      catchError(() => EMPTY)
    ))
  )

  @Effect()
  loadMoreRecentlyAdded$ = this.actions$.pipe(
    ofType<libraryActions.LoadMoreRecentlyAdded>(LibraryActionTypes.LoadMoreRecentlyAdded),
    map(action => action.payload.offset),
    mergeMap(offset => this.api.getRecentlyAdded('10', offset.toString()).pipe(
      map(items => new libraryActions.LoadRecentlyAddedSuccess({recentlyAddedItems: items}))
    ))
  )

  // artists

  @Effect()
  loadLibraryArtists$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryArtists>(LibraryActionTypes.LoadLibraryArtists),
    map(action => action.payload ? action.payload.offset : '0'),
    mergeMap(offset => this.api.getAllLibraryArtists('', offset.toString()).pipe(
      map(artists => new libraryActions.LoadLibraryArtistsSuccess({artists: artists}))
    ))
  )

  @Effect()
  loadLibraryArtist$ = this.actions$.pipe(
    ofType<libraryActions.LoadLibraryArtist>(LibraryActionTypes.LoadLibraryArtist),
    map(action => action.payload.id),
    mergeMap(id => this.api.getLibraryArtist(id).pipe(
      map(artist => new libraryActions.LoadLibraryArtistSuccess({artist: artist}))
    ))
  )

  @Effect()
  addToLibrary$ = this.actions$.pipe(
    ofType<libraryActions.AddToLibrary>(LibraryActionTypes.AddToLibrary),
    map(action => action.payload),
    mergeMap(payload => this.api.addToLibrary(payload.type, payload.id).pipe(
      map(() => new libraryActions.AddToLibrarySuccess())
    ))
  )

  @Effect()
  addToPlaylist$ = this.actions$.pipe(
    ofType<libraryActions.AddToPlaylist>(LibraryActionTypes.AddToPlaylist),
    map(action => action.payload),
    mergeMap(payload => this.api.addToLibraryPlaylist(payload.playlistId, payload.track).pipe(
      map(() => new libraryActions.AddToPlaylistSucess()),
      catchError(error => of(new libraryActions.AddToPlaylistFailure({error : error})))
    ))
  )

  @Effect()
  successToast$ = this.actions$.pipe(
    ofType(LibraryActionTypes.AddToLibrarySuccess, LibraryActionTypes.AddToPlaylistSucess),
    map(() => new appActions.AppShowToast({type: 'success'}))
  )

  @Effect()
  errorToast$ = this.actions$.pipe(
    ofType(
      LibraryActionTypes.AddToLibraryFailure, 
      LibraryActionTypes.AddToPlaylistFailure,
      LibraryActionTypes.LoadLibraryPlaylistFailure
      ),
    map(() => new appActions.AppShowToast({type: 'danger'}))
  )



}
