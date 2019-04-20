import { MusicKitService } from './music-kit.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Album } from '../models/album.model';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  headers: HttpHeaders;
  BASE_URL = "https://api.music.apple.com/v1/catalog";
  STOREFRONT = "us";

  constructor(private http: HttpClient, private musicKitService: MusicKitService) {

    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.musicKitService.musicKit.developerToken,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Music-User-Token': this.musicKitService.isAuthorized ? this.musicKitService.musicKit.musicUserToken : ''
    });

    console.log(this.musicKitService.musicKit.musicUserToken);
  }

  getGenres(): Observable<string[]> {
    return from( this.musicKitService.musicKit.api.genres());
  }

  // request using music kit method
  getCharts(): Observable<any> {
    let types = ['albums', 'songs', 'playlists'];
    return from( this.musicKitService.musicKit.api.charts(null, {types: types, genre: '17', limit: 20}))
  }

  // request using url params
  getOtherCharts(): Observable<any> {

    let params = new HttpParams()
    .set("types", "albums")
    .set("genre", "17")
    .set("limit", "10")

    return this.http.get(`${this.BASE_URL}/${this.STOREFRONT}/charts`, {headers: this.headers, params: params});
  }


  getAlbum(id: string): Observable<Album> {
    return from(this.musicKitService.musicKit.api.album(id));
  }



}
