import { MusicKitService } from './services/music-kit.service';
import { Component, OnInit } from '@angular/core';

declare var MusicKit: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'music';
  public isNavCollapsed = true;

  value = 0;
  options = {
    floor: 0,
    ceil: 6.59,
    step: 0.01,
    hidePointerLabels: true
  }

  constructor(private musicKitService: MusicKitService) {}

  onClick(){
    this.musicKitService.authorize();
  }

}
