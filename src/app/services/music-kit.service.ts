import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from , of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {

  musicKit: any;
  isAuthorized: boolean = false;

  constructor() {

    MusicKit.configure({
      developerToken: environment.token.token,
      app: {
      name: 'Music Player',
      build: '1.0'
      }
    });

    this.musicKit = MusicKit.getInstance();
    this.isAuthorized = this.musicKit.isAuthorized;
   }

   authorize() {
     from(this.musicKit.authorize()).subscribe(() => {
       this.isAuthorized = true;
     });
   }

    unauthorize() {
      from(this.musicKit.unauthorize()).subscribe(() => {
        this.isAuthorized = false;
      })
    }

    formatArtworkURL(artwork: any, size: string): Observable<string> {
      return of(MusicKit.formatArtworkURL( {'url': artwork} , size, size));
    }

}
