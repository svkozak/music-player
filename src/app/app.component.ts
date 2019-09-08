import { selectIsLoggedIn, selectShowToast, selectToastOptiions } from './state/selectors/app.selectors';
import { PlayerActions, SkipToNextAction } from './state/actions/player.actions';
import { Store } from '@ngrx/store';
import { MusicKitService } from './services/music-kit.service';
import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { PlayerService } from './services/player.service';
import { fromEvent } from 'rxjs';
import * as appActions from './state/actions/app.actions';
import * as feather from 'feather-icons';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';


declare var MusicKit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isLoggedIn: boolean;
  title = 'music';
  public isNavCollapsed = true;

  toastOptions: any;

  constructor(private store: Store<any>, private elRef: ElementRef) {
    this.store.dispatch(new appActions.AppCheckAuthorization());
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.store.select(selectToastOptiions).subscribe(toastOptions => this.toastOptions = toastOptions);
  }


  onClickLogin(){
    this.store.dispatch(new appActions.AppLogIn());
  }

  onClickLogOut() {
    this.store.dispatch(new appActions.AppLogOut());
  }

  showAlert() {
    this.store.dispatch(new appActions.AppShowToast());
  }

  dismissAlert() {
    this.store.dispatch(new appActions.AppDismissToast());
  }

}

