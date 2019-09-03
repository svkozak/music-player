import { TOKEN } from './../../secret/token';
import { URLS } from './../state/app.constants';
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
  }

  // Catalog

  getGenres(): Observable<any> {
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

  getCatalogCharts(genre: string = '', limit: number = 20) {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('types', 'albums,playlists,songs')
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/charts`, options).pipe(
      map(response => {
        console.log('get catalog charts', response);
        return response;
      })
    )
  }

  getCatalogGenres(genre: string = '', limit: number = 20) {
    const options = {
      headers: this.headers,
      params: new HttpParams()
    };
    return this.http.get<any>(`${URLS.BASE_CATALOG_URL}/${this.storefront}/genres`, options).pipe(
      map(response => {
        console.log(response);
        return response.data;
      })
    )
  }



  getAlbum(id: string): Observable<any> {
    console.log(`Get album called with id ${id}`);
    return from(this.musicKitService.musicKit.api.album(id));
  }

  getPlaylist(id: string): Observable<any> {
    console.log(`Get playlist called with id ${id}`);
    return from(this.musicKitService.musicKit.api.playlist(id));
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
      map(response => {
        console.log('search catalog resources', response);
        return response.results;
      })
    )
  }


  // User library

  getRecommendations(limit: string = '10', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('limit', limit).set('offset', offset).set('types', 'playlists,albums')
    };
    return this.http.get<any>(URLS.DEFAULT_RECOMMENDATIONS, options).pipe(
      map(response => {
        console.log(response);
        return response.data
      })
    )
  }

  getRecommendation(id: string, offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('offset', offset)
    };
    return this.http.get<any>(`${URLS.DEFAULT_RECOMMENDATIONS}/${id}`, options).pipe(
      map(response => {
        console.log(response);
        return response.data
      })
    )
  }

  getLibraryAlbum(id: string): Observable<any> {
    console.log(`GET LIBRARY ITEM CALLED`);
    return from(this.api.library.album(id));
  }

  getLibraryPlaylist(id: string): Observable<any> {
    console.log(`GET LIBRARY playlist CALLED`);
    return from(this.api.library.playlist(id));
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

  searchLibrary(term: string, limit: string = '20', offset: string = '0') {
    const options = {
      headers: this.headers,
      params: new HttpParams().set('term', term).set('limit', limit).set('offset', offset).set('types', 'library-artists,library-albums,library-playlists,library-songs')
    };
    return this.http.get<any>(`${URLS.BASE_LIBRARY_URL}/search`, options).pipe(
      map(response => {
        console.log('search library resources', response);
        return response.results;
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
