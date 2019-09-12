import { activities } from './../../state/app.constants';
import { selectActivities } from './../state/browse.selectors';
import { Activity } from './../../models/activity.model';
import { LoadActivities } from './../state/browse.actions';
import { selectIsLoadingPlaylists, selectPlaylists } from '../state/playlist.selector';
import { selectAlbums, selectIsLoading } from '../state/album.selectors';
import { LoadAlbums, LoadAlbum } from '../state/album.actions';
import { MusicKitService } from '../../services/music-kit.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/album.model';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoadPlaylists } from 'src/app/browse/state/playlists.actions';
import { Playlist } from 'src/app/models/playlist.model';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  isLoadingAlbums: boolean;
  isLoadingPlaylists: boolean;
  topAlbums: Album[];
  topPlaylists: Playlist[];
  activities: Activity[];

  constructor(
    private musicKitService: MusicKitService,
    private store: Store<any>,
    private router: Router
    ) { 

    }

  ngOnInit() {
    this.store.select(selectIsLoading).subscribe(isLoading => this.isLoadingAlbums = isLoading);
    this.store.select(selectIsLoadingPlaylists).subscribe(isLoading => this.isLoadingPlaylists = isLoading);
    this.store.select(selectAlbums).subscribe(albums => this.loadAlbums(albums));
    this.store.select(selectPlaylists).subscribe(playlists => this.loadPlaylists(playlists));
    this.store.select(selectActivities).subscribe(activities => this.loadActivities(activities));
  }

  loadAlbums(albums: Album[]) {
    if (albums.length) {
      this.topAlbums = albums;
    } else {
      this.store.dispatch(new LoadAlbums());
    }
  }

  loadPlaylists(playlists: Playlist[]) {
    if (playlists.length) {
      this.topPlaylists = playlists;
    } else {
      this.store.dispatch(new LoadPlaylists());
    }
  }

  loadActivities(activities: Activity[]) {
    if (activities.length) {
      this.activities = activities;
    } else {
      this.store.dispatch(new LoadActivities());
    }
  }
  
  onAlbumSelected(album: Album) {
    this.router.navigate(['browse/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    console.log(`PLAYLIST ID IS ${playlist.id}`);
    this.router.navigate(['browse/playlists', playlist.id]);
  }

  onActivitySelected(activity: Activity) {
    console.log(`Activity ID IS ${activity.id}`);
    this.router.navigate(['browse/activities', activity.id]);
  }

  toggle(popover) {
    console.log('toggling popover');
    popover.toggle();
  }

}
