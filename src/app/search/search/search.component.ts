import { selectIsSearchLoading } from './../state/search.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as searchActions from '../state/search.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean;
  searchOption: string = 'catalog';
  placeholder = 'Search Apple Music';

  searchTerm = '';

  constructor(private store: Store<any>) { 
    this.store.select(selectIsSearchLoading).subscribe(isLoading => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
  }


  onChange(event) {
    console.log(event);
  }

  search() {
    if (this.searchTerm) {
      this.store.dispatch(new searchActions.SearchCatalog({term: this.searchTerm}))
    }
  }

}
