import { ActivityViewComponent } from './activity-view/activity-view.component';
import { BrowseRootComponent } from './browse-root.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { BrowseComponent } from './browse/browse.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistViewComponent } from './artist-view/artist-view.component';



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
      },
      {
        path: 'artists/:id',
        component: ArtistViewComponent
      },
      {
        path: 'activities/:id',
        component: ActivityViewComponent
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
