import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchRootComponent } from './search-root.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SearchRootComponent, SearchComponent],
  imports: [
    CommonModule,
    NgbModule,
    SearchRoutingModule,
    FormsModule
  ]
})
export class SearchModule { }
