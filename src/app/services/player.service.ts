import { map, catchError } from 'rxjs/operators';
import { MusicKitService } from './music-kit.service';
import { Injectable } from '@angular/core';
import { from, Observable, EMPTY } from 'rxjs';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player;

  constructor(
    private musicKitService: MusicKitService
  ) { 
    this.player = this.musicKitService.musicKit.player
  }

  play(): Observable<any> {
    return from(this.player.play()).pipe(
      map(res => console.log(`Play response ${JSON.stringify(res)}`)),
      catchError(err => EMPTY)
    );
  }

  stop(): Observable<any> {
    return from(this.player.stop());
  };

  setQueue(item: any): Observable<any> {
    return from(this.musicKitService.musicKit.setQueue({album: item.id})).pipe(
      map(val => console.log(`SetQueue response`)),
      catchError(err => EMPTY)
    );
  }

  
}
