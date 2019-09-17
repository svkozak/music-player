import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from , of, fromEvent, Observable, combineLatest } from 'rxjs';
import { mergeMap, map, switchMap, withLatestFrom, merge } from 'rxjs/operators';
import { TOKEN } from 'src/secret/token';

declare var MusicKit: any;

@Injectable({
  providedIn: 'root'
})
export class MusicKitService {

  authorizationStatus$: Observable<any>;
  isAuthorized$: Observable<any>;
  musicKit: any;
  // isAuthorized: boolean = false;

  constructor() {

    MusicKit.configure({
      developerToken: TOKEN,
      app: {
      name: 'iamplayer',
      icon: '/src/assets/icons/icon-180x180.png',
      build: '1.0'
      },
      declarativeMarkup: true
    });

    this.musicKit = MusicKit.getInstance();
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
            return value.authorizationStatus === 1;
          })
        ))
      );
    }

    formatArtworkURL(artwork: any, size: string): Observable<string> {
      return of(MusicKit.formatArtworkURL( {'url': artwork} , size, size));
    }

}
