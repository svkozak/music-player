import { selectIsLoggedIn, selectToastOptiions } from './state/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, ElementRef } from '@angular/core';

import * as appActions from './state/actions/app.actions';


declare var MusicKit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sidebarOpened: boolean = false;
  isLoggedIn: boolean;

  toastOptions: any;

  constructor(private store: Store<any>, private elRef: ElementRef) { }

  ngOnInit() {
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

