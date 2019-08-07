import { BrowseRootComponent } from './browse-root.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { AlbumViewComponent } from './album-view/album-view.component';
import { BrowseComponent } from './browse/browse.component';
import { WidgetModule } from './../widget/widget.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BrowseRootComponent,
    BrowseComponent,
    AlbumViewComponent,
    PlaylistViewComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    BrowseRoutingModule
  ]
})
export class BrowseModule { }
