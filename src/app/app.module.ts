import { BrowseModule } from './browse/browse.module';
import { WidgetModule } from './widget/widget.module';
import { LibraryModule } from './library/library.module';
import { LibraryEffects } from './library/state/library.effects';
import { PlayerEffects } from './state/effects/player.effects';
import { AlbumEffects } from './browse/state/album.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state/reducers/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './state/effects/app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { PlayerComponent } from './player/player.component';
import { PlaylistEffects } from './browse/state/playlist.effects';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects, AlbumEffects, PlaylistEffects, LibraryEffects, PlayerEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
    HttpClientModule,
    Ng5SliderModule,
    LibraryModule,
    BrowseModule,
    WidgetModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
