import { URLS } from './../state/app.constants';
import { Album } from './../models/album.model';
import { MusicKitService } from './music-kit.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Playlist } from '../models/playlist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  
  headers: HttpHeaders;
  STOREFRONT = "us";
  private api;

  constructor(private http: HttpClient, private musicKitService: MusicKitService) {

    this.headers = new HttpHeaders({
      // 'Authorization': 'Bearer ' + this.musicKitService.musicKit.developerToken,
      'Authorization': 'Bearer ' + environment.token.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitService.musicKit.isAuthorized ? this.musicKitService.musicKit.musicUserToken : ''
    });

    this.api = this.musicKitService.musicKit.api

    // console.log(this.musicKitService.musicKit.musicUserToken);
  }

  // Catalog

  getGenres(): Observable<string[]> {
    return from( this.musicKitService.musicKit.api.genres());
  }

  // request using music kit method
  // let types = ['albums', 'songs', 'playlists'];
  getDancePlaylists(): Observable<any> {
    let types = ['playlists'];
    let result$ = from(this.musicKitService.musicKit.api.charts(null, { types, genre: '17', limit: 20 }));
    return result$.pipe(map(val => val));
  }


  // CURRENTLY USING
  // {types: types, genre: '17', limit: 20}
  getCharts(genre: string = '', limit: number = 20): Observable<any> {
    let types = ['albums', 'songs', 'playlists'];
    let result$ = from(this.musicKitService.musicKit.api.charts(types, {genre: '', limit: limit}));
    return result$.pipe(map(val => val));
  }

  getAlbum(id: string): Observable<Album> {
    console.log(`Get album called with id ${id}`);
    return from(this.musicKitService.musicKit.api.album(id));
  }

  getPlaylist(id: string): Observable<Playlist> {
    console.log(`Get playlist called with id ${id}`);
    return from(this.musicKitService.musicKit.api.playlist(id));
  }

  // User library

  getLibraryAlbum(id: string): Observable<Album> {
    console.log(`GET LIBRARY ITEM CALLED`);
    return from(this.api.library.album(id));
  }

  getLibraryPlaylist(id: string): Observable<Playlist> {
    console.log(`GET LIBRARY playlist CALLED`);
    return from(this.api.library.playlist(id));
  }

  getRecommendations() {
    from(this.api.recommendations()).subscribe(val => console.log(val));
  }

  getRecentlyAdded(limit: string = '10', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset)
    };
    return this.http.get<any>(URLS.LIBRARY_RECENTLY_ADDED, options).pipe(
      map(response => response.data)
    )
  }

  getAllLibraryAlbums(limit: string = '10', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset)
    };
    return this.http.get<any>(URLS.LIBRARY_ALBUMS, options).pipe(
      map(response => response.data)
    )
  }

  getAllLibraryPlaylists(limit: string = '25', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset)
    };
    return this.http.get<any>(URLS.LIBRARY_PLAYLISTS, options).pipe(
      map(response => response.data)
    )
  }

  getAllLibraryArtists(limit: string = '10', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset)
    };
    return this.http.get<any>(URLS.LIBRARY_ARTISTS, options).pipe(
      map(response => {
        console.log(response);
        return response.data
      })
    )
  }

  getLibraryArtist(id: string) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('include', 'albums')
    };
    return this.http.get<any>(`${URLS.LIBRARY_ARTISTS}/${id}`, options).pipe(
      map(response => {
        console.log(response.data);
        return response.data[0]
      })
    )
  }






  getPlaylistArtworkUrl(id: string) {
    const options = {headers: this.headers};
    return this.http.get<any>(`${URLS.LIBRARY_PLAYLISTS}/${id}`, options).pipe(
      map(val => {
        return val.data[0].attributes.artwork.url;
      })
    )
  } 



}
