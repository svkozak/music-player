import { WidgetModule } from './../widget/widget.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRootComponent } from './library-root.component';
import { LibraryAlbumViewComponent } from './library-album-view/library-album-view.component';
import { LibraryPlaylistViewComponent } from './library-playlist-view/library-playlist-view.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryRootComponent,
    LibraryAlbumViewComponent,
    LibraryPlaylistViewComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
