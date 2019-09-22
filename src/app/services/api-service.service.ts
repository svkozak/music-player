import { Track } from 'src/app/models/track.model';
import { TOKEN } from './../../secret/token';
import { URLS, activities } from './../state/app.constants';
import { Album } from './../models/album.model';
import { MusicKitService } from './music-kit.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  activities;
  headers: HttpHeaders;
  storefront: string;
  private api;

  constructor(private http: HttpClient, private musicKitService: MusicKitService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + TOKEN,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitService.musicKit.isAuthorized ? this.musicKitService.musicKit.musicUserToken : ''
    });

    this.api = this.musicKitService.musicKit.api
    this.storefront = this.musicKitService.musicKit.storekit.storefrontCountryCode;
    this.activities = activities;
  }

  // Catalog

  getGenres(): Observable<any> {
    return from( this.musicKitService.musicKit.api.genres());
  }

  // {types: types, genre: '17', limit: 20}
  getCharts(genre: string = '', limit: number = 20): Observable<any> {
    let types = ['albums', 'songs', 'playlists'];
    let result$ = from(this.musicKitService.musicKit.api.charts(types, {genre: '', limit: limit}));
    return result$.pipe(map(val => val));
  }

  getCatalogCharts(genre: string = '', limit: number = 20) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('types', 'albums,playlists,songs').set('genre', genre)
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/charts`, options).pipe(
      map(response => response)
    )
  }

  getCatalogActivity(id: string) {
    const options = {
      headers: this.headers
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/activities/${id}`, options).pipe(
      map(response => response.data[0])
    )
  }

  getCatalogActivities() {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('ids', `${Object.values(this.activities).toString()}`)
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/activities`, options).pipe(
      map(response => response.data)
    )
  }

  getCatalogPlaylists(ids: string[]) {
    // ids to string

    const options = {
      headers: this.headers,
      params: new HttpParams().set('ids', `${ids.toString()}`)
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/playlists`, options).pipe(
      map(response => response.data)
    )
  }

  getCatalogGenres(genre: string = '', limit: number = 20) {
    const options = {
      headers: this.headers,
      params: new HttpParams()
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/genres`, options).pipe(
      map(response => response.data)
    )
  }

  getCatalogAlbum(id: String) {
    const options = {
      headers: this.headers,
      params: new HttpParams()
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/albums/${id}`, options).pipe(
      map(response => response.data[0])
    )
  }

  getCatalogPlaylist(id: String) {
    const options = {
      headers: this.headers,
      params: new HttpParams()
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/playlists/${id}`, options).pipe(
      map(response => response.data[0])
    )
  }

  getCatalogArtist(id: string) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('include', 'albums,playlists,songs')
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/artists/${id}`, options).pipe(
      map(response => {
        console.log('get catalog artist', response);
        return response.data[0];
      })
    )
  }

  getCatalogArtistRelatioship(artistId: string, relationship: string, limit: string = '10') {
    console.log(`${URLS.BASE_CATALOG_URL}/${this.storefront}/artists/${artistId}/${relationship}`);
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit)
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/artists/${artistId}/${relationship}`, options).pipe(
      map(response => {
        console.log('get artist relationships by name', response);
        return response;
      })
    )
  }

  searchCatalog(term: string, limit: string = '20', offset: string = '0') {
    console.log(`${term}`);
    const options = {
      headers: this.headers,
      params: new HttpParams().set('term', term).set('limit', limit).set('offset', offset).set('types', 'artists,albums,playlists,songs')
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/search`, options).pipe(
      map(response => response.results)
    )
  }


  // User library

  getRecommendations(limit: string = '10', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset).set('types', 'playlists,albums')
    };
    return this.http.get<any>(URLS.DEFAULT_RECOMMENDATIONS, options).pipe(
      map(response => response.data)
    )
  }

  getRecommendation(id: string, offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('offset', offset)
    };
    return this.http.get<any>(`${URLS.DEFAULT_RECOMMENDATIONS}/${id}`, options).pipe(
      map(response => response.data)
    )
  }

  getLibraryAlbum(id: String) {
    const options = {
      headers: this.headers,
      params: new HttpParams()
    };
    return this.http.get<any>(`${URLS.BASE_LIBRARY_URL}/albums/${id}`, options).pipe(
      map(response => response.data[0])
    )
  }

  getLibraryPlaylist(id: String) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('include', 'tracks')
    };
    return this.http.get<any>(`${URLS.BASE_LIBRARY_URL}/playlists/${id}`, options).pipe(
      map(response => response.data[0])
    )
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
      map(response => response.data)
    )
  }

  getLibraryArtist(id: string) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('include', 'albums')
    };
    return this.http.get<any>(`${URLS.LIBRARY_ARTISTS}/${id}`, options).pipe(
      map(response => response.data[0])
    )
  }

  searchLibrary(term: string, limit: string = '20', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('term', term).set('limit', limit).set('offset', offset).set('types', 'library-artists,library-albums,library-playlists,library-songs')
    };
    return this.http.get<any>(`${URLS.BASE_LIBRARY_URL}/search`, options).pipe(
      map(response => response.results)
    )
  }

  addToLibrary(type: string, id: string) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set(`ids[${type}]`, id)
    };
    return this.http.post(`${URLS.BASE_LIBRARY_URL}`, {}, options).pipe(
      map(val => console.log('return from POST', val))
    )
  }

  addToLibraryPlaylist(playlistId: string, track: Track) {
    const options = { headers: this.headers };
    const data = {data:[ { id: track.id, type : track.type} ]};
    return this.http.post(`${URLS.BASE_LIBRARY_URL}/playlists/${playlistId}/tracks`, data, options).pipe(
      map(val => console.log('return from POST', val))
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
