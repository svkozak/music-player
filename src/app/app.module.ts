import { BrowseEffects } from './browse/state/browse.effects';
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
import { PlayerComponent } from './player/player.component';
import { PlaylistEffects } from './browse/state/playlist.effects';
import { ForYouModule } from './for-you/for-you.module';
import { ForYouEffects } from './for-you/state/for-you.effects';
import { SearchModule } from './search/search.module';
import { FormsModule } from '@angular/forms';
import { SearchEffects } from './search/state/search.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    WidgetModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      AppEffects,
      AlbumEffects,
      PlaylistEffects,
      LibraryEffects,
      PlayerEffects,
      ForYouEffects,
      BrowseEffects,
      SearchEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule,
    LibraryModule,
    BrowseModule,
    ForYouModule,
    SearchModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
