import { MusicKitService } from './music-kit.service';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

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
    return from(this.player.play())
  }

  
}
