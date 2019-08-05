import { selectIsLoadingPlaylists, selectPlaylists } from './../../state/selectors/playlist.selector';
import { selectAlbums, selectIsLoading } from './../../state/selectors/album.selectors';
import { LoadAlbums, LoadAlbum } from './../../state/actions/album.actions';
import { MusicKitService } from './../../services/music-kit.service';
import { Component, OnInit } from '@angular/core';
import { Album } from './../../models/album.model';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoadPlaylists } from 'src/app/state/actions/playlists.actions';
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

  constructor(
    private musicKitService: MusicKitService,
    private store: Store<any>,
    private router: Router
    ) { }

  ngOnInit() {
    this.store.dispatch(new LoadAlbums());
    this.store.dispatch(new LoadPlaylists());
    this.store.select(selectAlbums).subscribe(albums => this.topAlbums = albums);
    this.store.select(selectPlaylists).subscribe(playlists => this.topPlaylists = playlists);
    this.store.select(selectIsLoading).subscribe(isLoading => this.isLoadingAlbums = isLoading);
    this.store.select(selectIsLoadingPlaylists).subscribe(isLoading => this.isLoadingPlaylists = isLoading);
  }

  formatArtwork(artwork: any, size: string): string {
    let url = "";
    this.musicKitService.formatArtworkURL(artwork, size).subscribe(res => {
      url = res;
    });
    return url;
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    console.log(`PLAYLIST ID IS ${playlist.id}`);
    this.router.navigate(['playlists', playlist.id]);
  }

}
