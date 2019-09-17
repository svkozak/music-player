import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() opened: boolean;
  @Input() closeOnClick: boolean;
  @Input() isLoggedIn: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  @Output() signIn: EventEmitter<any> = new EventEmitter();
  @Output() signOut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.closeOnClick) {
      this.toggle.emit(true);
    }
  }

}
