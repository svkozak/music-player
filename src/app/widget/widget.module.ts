import { FormattedTimePipe } from './pipes/formatted-time.pipe';
import { AlbumArtPipe } from './pipes/album-art.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TrackComponent } from './track/track.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ArtworkComponent } from './artwork/artwork.component';
import { LibraryAlbumComponent } from './library-album/library-album.component';

@NgModule({
  declarations: [
    AlbumArtPipe,
    FormattedTimePipe,
    SpinnerComponent,
    AlbumComponent,
    PlaylistComponent,
    TrackComponent,
    ArtworkComponent,
    LibraryAlbumComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlbumArtPipe,
    FormattedTimePipe,
    SpinnerComponent,
    AlbumComponent,
    PlaylistComponent,
    TrackComponent,
    ArtworkComponent,
    LibraryAlbumComponent
  ]
})
export class WidgetModule { }
