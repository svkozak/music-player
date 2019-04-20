import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowseComponent } from './components/browse/browse.component';
import { LibraryComponent } from './components/library/library.component';
import { HttpClientModule } from '@angular/common/http';
import { AlbumComponent } from './common/album/album.component';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { AlbumArtPipe } from './pipes/album-art.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BrowseComponent,
    LibraryComponent,
    AlbumComponent,
    AlbumViewComponent,
    AlbumArtPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
