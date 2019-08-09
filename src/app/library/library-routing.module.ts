import { LibraryPlaylistViewComponent } from './library-playlist-view/library-playlist-view.component';
import { LibraryAlbumViewComponent } from './library-album-view/library-album-view.component';
import { LibraryRootComponent } from './library-root.component';
import { AuthGuard } from './../auth/auth.guard';
import { LibraryComponent } from './library/library.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const libraryRoutes: Routes = [
  {
    path: 'library',
    component: LibraryRootComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { 
        path: '',
        component: LibraryComponent,
      },
      {
        path: 'albums/:id',
        component: LibraryAlbumViewComponent
      },
      {
        path: 'playlists/:id',
        component: LibraryPlaylistViewComponent
      }
    ]
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