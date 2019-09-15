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
  AlertCircle,
  Menu,
  X,
  Music,
  Globe,
  Heart,
  Headphones,
  Github,
  Linkedin

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
  AlertCircle,
  Menu,
  X,
  Music,
  Globe,
  Heart,
  Headphones,
  Github,
  Linkedin
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
