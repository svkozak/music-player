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
  BASE_URL = "https://api.music.apple.com/";
  STOREFRONT = "us";

  constructor(private http: HttpClient, private musicKitService: MusicKitService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.musicKitService.musicKit.developerToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitService.musicKit.isAuthorized ? this.musicKitService.musicKit.musicUserToken : ''
    });

    // console.log(this.musicKitService.musicKit.musicUserToken);
  }

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



}
