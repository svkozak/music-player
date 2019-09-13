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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastComponent } from './toast/toast.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from './playlists-modal/playlists-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivityComponent } from './activity/activity.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

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
    LibraryArtistsComponent,
    ToastComponent,
    PlaylistsModalComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeatherIconsModule,
    NgbModule,
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule
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
    PopoverModule,
    BsDropdownModule,
    ToastComponent,
    AlertModule,
    ModalModule,
    PlaylistsModalComponent,
    ActivityComponent,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  entryComponents: [
    PlaylistsModalComponent
  ]
})
export class WidgetModule { }
