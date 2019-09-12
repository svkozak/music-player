import { LoadActivityPlaylists } from './../state/browse.actions';
import { Playlist } from './../../models/playlist.model';
import { activities } from './../../state/app.constants';
import { selectActivities, selectIsBrowseLoading, selectActivityPlaylists, selectSelectedActivity } from './../state/browse.selectors';
import { Activity } from './../../models/activity.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import * as browseActions from '../state/browse.actions';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements OnInit {

  isLoading: boolean;
  activity: Activity;
  playlists: Playlist[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(id => this.store.dispatch(new browseActions.LoadActivity({id: id})));

    this.store.select(selectIsBrowseLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectSelectedActivity).subscribe(activity => {
        if (activity) {
          this.activity = activity;
          this.store.dispatch(new browseActions.LoadActivityPlaylists({playlists: activity.relationships.playlists.data}))
        }
    });
    this.store.select(selectActivityPlaylists).subscribe(playlists => this.playlists = playlists);
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate( ['browse/playlists', playlist.id] );
  }


}
