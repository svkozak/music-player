import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './components/browse/browse.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes = [
  { path: 'browse', component: BrowseComponent, data: { title: 'Browse' } },
  { path: 'albums/:id', component: AlbumViewComponent },
  { path: 'library', component: LibraryComponent, data: { title: 'Library' } },
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
