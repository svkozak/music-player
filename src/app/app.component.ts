import { MusicKitService } from './services/music-kit.service';
import { selectIsLoggedIn, selectToastOptiions, selectGlobalLoading } from './state/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, HostListener } from '@angular/core';

import * as appActions from './state/app.actions';
import { Router, NavigationEnd } from '@angular/router';


declare let MusicKit: any;
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading: boolean = false;
  sidebarOpened: boolean = false;
  isLoggedIn: boolean;
  navbarShadow: boolean = false;

  toastOptions: any;

  constructor(private store: Store<any>, private router: Router, private musicKitService: MusicKitService) { }

  ngOnInit() {
    this.store.dispatch(new appActions.AppCheckAuthorization());
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.store.select(selectGlobalLoading).subscribe(isLoading => setTimeout(() => this.isLoading = isLoading));
    this.store.select(selectToastOptiions).subscribe(toastOptions => this.toastOptions = toastOptions);
    // google analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.navbarShadow = window.pageYOffset > 60 ? true : false;
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

