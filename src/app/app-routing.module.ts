import { AuthGuard } from './auth/auth.guard';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './components/browse/browse.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes = [
  { 
    path: 'browse',
    component: BrowseComponent,
    data: { title: 'Browse' },
  },
  { 
    path: 'albums/:id',
    component: AlbumViewComponent 
  },
  { 
    path: 'playlists/:id', 
    component: PlaylistViewComponent 
  },
  { 
    path: 'library',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: LibraryComponent
      },
      {
        path: 'albums/:id',
        component: AlbumViewComponent
      }
    ]
  },
  { 
    path: '',
    redirectTo: '/browse',
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
