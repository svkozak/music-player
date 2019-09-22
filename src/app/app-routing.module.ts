import { BrowseComponent } from './browse/browse/browse.component';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'for-you',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  { path: '**', 
    redirectTo: 'browse',
    pathMatch: 'full'  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
