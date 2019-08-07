import { LibraryEffects } from './state/effects/library.effects';
import { PlayerEffects } from './state/effects/player.effects';
import { AlbumEffects } from './state/effects/album.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/effects/app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowseComponent } from './components/browse/browse.component';
import { LibraryComponent } from './components/library/library.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './common/album/album.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { AlbumArtPipe } from './pipes/album-art.pipe';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TrackComponent } from './common/track/track.component';
import { PlayerComponent } from './common/player/player.component';
import { FormattedTimePipe } from './pipes/formatted-time.pipe';
import { PlaylistComponent } from './common/playlist/playlist.component';
import { PlaylistEffects } from './state/effects/playlist.effects';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { ArtworkComponent } from './common/artwork/artwork.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    LibraryComponent,
    AlbumComponent,
    AlbumViewComponent,
    AlbumArtPipe,
    SpinnerComponent,
    TrackComponent,
    PlayerComponent,
    FormattedTimePipe,
    PlaylistComponent,
    PlaylistViewComponent,
    ArtworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, AlbumEffects, PlaylistEffects, LibraryEffects, PlayerEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
    HttpClientModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
