import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { 
  Search, 
  LogIn, 
  LogOut, 
  SkipForward, 
  SkipBack, 
  Play, 
  Pause, 
  MoreHorizontal, 
  MoreVertical,
  List,
  Plus,
  Check,
  AlertCircle
} from 'angular-feather/icons';

const icons = {
  Search, 
  LogIn,
  LogOut,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MoreHorizontal,
  MoreVertical,
  Plus,
  List,
  Check,
  AlertCircle
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
