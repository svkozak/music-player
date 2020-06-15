import { MusicKitService } from './services/music-kit.service';
import { selectIsLoggedIn, selectToastOptiions, selectGlobalLoading } from './state/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, HostListener } from '@angular/core';

import * as appActions from './state/app.actions';
import { ToastOptions } from './state/app.actions';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';


declare let MusicKit: any;
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  toastOptions$: Observable<ToastOptions>;
  sidebarOpened: boolean = false;
  navbarShadow: boolean = false;


  constructor(private store: Store<any>, private router: Router, private musicKitService: MusicKitService) { }

  ngOnInit(): void {
    this.store.dispatch(new appActions.AppCheckAuthorization());
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoading$ = this.store.select(selectGlobalLoading);
    this.toastOptions$ = this.store.select(selectToastOptiions);

    // google analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.navbarShadow = window.pageYOffset > 60 ? true : false;
 }


  onClickLogin(): void {
    this.store.dispatch(new appActions.AppLogIn());
  }

  onClickLogOut(): void {
    this.store.dispatch(new appActions.AppLogOut());
  }

  showAlert(): void {
    this.store.dispatch(new appActions.AppShowToast());
  }

  dismissAlert(): void {
    this.store.dispatch(new appActions.AppDismissToast());
  }

}

