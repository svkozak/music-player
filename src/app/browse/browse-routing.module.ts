import { BrowseRootComponent } from './browse-root.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { BrowseComponent } from './browse/browse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const browseRoutes: Routes = [
  {
    path: 'browse',
    component: BrowseRootComponent,
    children: [
      {
        path: '',
        component: BrowseComponent
      },
      {
        path: 'albums/:id',
        component: AlbumViewComponent
      },
      {
        path: 'playlists/:id',
        component: PlaylistViewComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(browseRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class BrowseRoutingModule { }
