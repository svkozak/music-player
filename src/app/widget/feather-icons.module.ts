import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Search, LogIn, LogOut } from 'angular-feather/icons';

const icons = {
  Search, 
  LogIn,
  LogOut
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
