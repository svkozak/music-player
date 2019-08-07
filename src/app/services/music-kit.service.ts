import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from , of, fromEvent, Observable } from 'rxjs';
import { mergeMap, map, switchMap } from 'rxjs/operators';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {

  musicKit: any;
  // isAuthorized: boolean = false;

  constructor() {

    MusicKit.configure({
      developerToken: environment.token.token,
      app: {
      name: 'Music Player',
      build: '1.0'
      },
      declarativeMarkup: true
    });

    this.musicKit = MusicKit.getInstance();
    // this.isAuthorized = this.musicKit.isAuthorized;
   }

    isUserAuthorized(): Observable<any> {
      return of(this.musicKit.isAuthorized);
    }


    authorize(): Observable<any> {
    return from(this.musicKit.authorize()).pipe(
      switchMap(() => of(this.musicKit.isAuthorized))
    );
   }

    unauthorize() {
      return from(this.musicKit.unauthorize()).pipe(
        switchMap(() => fromEvent(this.musicKit, MusicKit.Events.authorizationStatusDidChange).pipe(
          map((value: any) => {
            console.log(value);
            return value.authorizationStatus === 1;
          })
        ))
      );
    }

    formatArtworkURL(artwork: any, size: string): Observable<string> {
      return of(MusicKit.formatArtworkURL( {'url': artwork} , size, size));
    }

}
