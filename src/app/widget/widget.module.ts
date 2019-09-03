import { FeatherIconsModule } from './feather-icons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { PlaylistArtPipe } from './pipes/playlist-art.pipe';
import { ArtistComponent } from './artist/artist.component';
import { LibraryNavComponent } from './library-nav/library-nav.component';
import { RouterModule } from '@angular/router';
import { LibraryArtistsComponent } from '../library/library-artists/library-artists.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

@NgModule({
  declarations: [
    AlbumArtPipe,
    FormattedTimePipe,
    SpinnerComponent,
    AlbumComponent,
    PlaylistComponent,
    TrackComponent,
    ArtworkComponent,
    LibraryAlbumComponent,
    PlaylistArtPipe,
    ArtistComponent,
    LibraryNavComponent,
    LibraryArtistsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeatherIconsModule,
    NgbModule,
    PopoverModule.forRoot()
  ],
  exports: [
    NgbModule,
    AlbumArtPipe,
    FormattedTimePipe,
    SpinnerComponent,
    AlbumComponent,
    PlaylistComponent,
    TrackComponent,
    ArtworkComponent,
    LibraryAlbumComponent,
    PlaylistArtPipe,
    ArtistComponent,
    LibraryNavComponent,
    FeatherIconsModule,
    PopoverModule
  ]
})
export class WidgetModule { }
