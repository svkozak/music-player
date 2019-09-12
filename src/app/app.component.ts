import { selectIsLoggedIn, selectToastOptiions } from './state/selectors/app.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

import * as appActions from './state/actions/app.actions';


declare var MusicKit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  sidebarOpened: boolean = false;
  sidebarMode: string;
  closeOnClick: boolean;
  isLoggedIn: boolean;
  title = 'music';
  public isNavCollapsed = true;

  toastOptions: any;

  constructor(private store: Store<any>, private elRef: ElementRef) { }

  ngOnInit() {
    this.sidebarMode = window.innerWidth <= 768 ? 'over' : 'push';
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

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
    console.log(this.sidebarOpened);
  }

  // change sidebar mode on resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth;
    this.sidebarMode = width <= 768 ? 'over' : 'push';
    this.closeOnClick = width <= 768 ? true : false;
  }

}

