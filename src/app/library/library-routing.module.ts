import { LibraryArtistsComponent } from './library-artists/library-artists.component';
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component';
import { LibraryAlbumsComponent } from './library-albums/library-albums.component';
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
        redirectTo: 'recently-added',
        pathMatch: 'full'
      },
      {
        path: 'recently-added',
        component: LibraryComponent
      },
      {
        path: 'albums',
        children: [
          {
            path: '',
            component: LibraryAlbumsComponent
          },
          {
            path: ':id',
            component: LibraryAlbumViewComponent
          }
        ]
      },
      {
        path: 'playlists',
        children: [
          {
            path: '',
            component: LibraryPlaylistsComponent
          },
          {
            path: ':id',
            component: LibraryPlaylistViewComponent
          }
        ]
      },
      {
        path: 'artists',
        component: LibraryArtistsComponent
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