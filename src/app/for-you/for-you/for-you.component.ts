import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';
import { selectRecommendations } from './../state/for-you.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as forYouActions from '../state/for-you.actions';
import { Recommendation } from 'src/app/models/recommendation.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.scss']
})
export class ForYouComponent implements OnInit {

  recommendations: Recommendation[];
  newReleases: Album[];
  carouselImages: any[];

  constructor(
    private store: Store<any>,
    private router: Router
  ) { 
    this.store.select(selectRecommendations).subscribe(recommendations => this.recommendations = recommendations);
  }

  ngOnInit() {
    if (!this.recommendations.length) {
      this.store.dispatch(new forYouActions.LoadForYou());
    }
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['browse/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate(['browse/playlists', playlist.id]);
  }

  loadMore(id: string) {
    console.log('load more recommendations for id ', id);
    
    let recommendation = this.recommendations.find(item => item.id === id);
    console.log(`recommendation : ${recommendation.id}`);
    this.store.dispatch(new forYouActions.LoadRecommendation({id: id, offset: '1'}));
  }

}

// recommendation.relationships.contents.data.length.toString()
