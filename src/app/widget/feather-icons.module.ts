import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Search, LogIn, LogOut, SkipForward, SkipBack, Play, Pause, MoreHorizontal, MoreVertical } from 'angular-feather/icons';

const icons = {
  Search, 
  LogIn,
  LogOut,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MoreHorizontal,
  MoreVertical
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class FeatherIconsModule { }
