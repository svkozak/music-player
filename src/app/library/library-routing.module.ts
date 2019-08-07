import { LibraryRootComponent } from './library-root.component';
import { AuthGuard } from './../auth/auth.guard';
import { LibraryComponent } from './library/library.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const libraryRoutes: Routes = [
  { 
    path: 'library',
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard]
    component: LibraryComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(libraryRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class LibraryRoutingModule { }