import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRootComponent } from './search-root.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchRootComponent,
    children: [
      {
        path: '',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
