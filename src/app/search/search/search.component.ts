import { selectNowPlayingItem } from './../../state/selectors/player.selectors';
import { selectSelectedLibraryArtist, selectIsLibraryLoading } from './../../library/state/library.selectors';
import { Router } from '@angular/router';
import { Track } from 'src/app/models/track.model';
import { Artist } from './../../models/artist.model';
import { Album } from './../../models/album.model';
import { selectIsSearchLoading, selectSearchAlbums, selectSearchResults, selectLibrarySearchResults } from './../state/search.selectors';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as searchActions from '../state/search.actions';
import * as libraryActions from '../../library/state/library.actions';
import * as playerActions from '../../state/actions/player.actions';
import { Playlist } from 'src/app/models/playlist.model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { PlaylistsModalComponent } from 'src/app/widget/playlists-modal/playlists-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  isLoading: boolean;
  isLibraryLoading: boolean;
  searchCatalog: boolean = true;
  placeholder = 'Search Apple Music';

  albums: Album[];
  playlists: Playlist[];
  artists: Artist[];
  tracks: Track[];

  libraryAlbums: Album[];
  libraryPlaylists: Playlist[];
  libraryArtists: Artist[];
  libraryTracks: Track[];
  selectedLibraryArtist: Artist;
  nowPlayingTrackId: string;
  bsModalRef: BsModalRef;

  searchTerm = '';

  constructor(private store: Store<any>, private router: Router, private modalService: BsModalService) {
    this.store.select(selectIsSearchLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.store.select(selectIsLibraryLoading).subscribe(isLoading => this.isLibraryLoading = isLoading);
    this.store.select(selectSearchResults).subscribe(results => {
      this.albums = results.albums;
      this.playlists = results.playlists;
      this.artists = results.artists;
      this.tracks = results.tracks;
    });
    this.store.select(selectLibrarySearchResults).subscribe(results => {
      this.libraryAlbums = results.libAlbums;
      this.libraryPlaylists = results.libPlaylists;
      this.libraryArtists = results.libArtists;
      this.libraryTracks = results.libTracks;
    });
    this.store.select(selectSelectedLibraryArtist).subscribe(artist => this.selectedLibraryArtist = artist);
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        this.nowPlayingTrackId = item.id;
      }
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.store.dispatch(new searchActions.SearchClear());
  }

  search() {
    if (this.searchTerm) {
      this.store.dispatch(new searchActions.SearchClear());
      this.store.dispatch(new searchActions.SearchCatalog({term: this.searchTerm}));
      this.store.dispatch(new searchActions.SearchLibrary({term: this.searchTerm}));
    }
  }

  onArtistSelected(artist: Artist) {
    if (artist.type === 'artists') {
      this.router.navigate(['browse/artists', artist.id]);
    } else {
      this.store.dispatch(new libraryActions.LoadLibraryArtist({id: artist.id}));
    }
  }

  onAlbumSelected(album: Album) {
    if (album.type === 'albums') {
      this.router.navigate(['browse/albums', album.id]);
    } else {
      this.router.navigate(['library/albums', album.id]);
    }
    
  }

  onPlaylistSelected(playlist: Playlist) {
    if (playlist.type === 'playlists') {
      this.router.navigate(['browse/playlists', playlist.id]);
    } else {
      this.router.navigate(['library/playlists', playlist.id]);
    }
  }

  onPlayTrack(track: Track) {
    let tracks: Track[] = [];
    tracks.push(track);
    this.store.dispatch(new playerActions.SetQueueAction({tracks: tracks}));
  }

  onAddToLibrary(track?: Track, album?: Album) {
    const type  = track.type || album.type;
    const id = track.id || album.id;
    this.store.dispatch(new libraryActions.AddToLibrary({type: type, id: id}));
  }

  onAddToPlaylist(track: Track) {
    const options: ModalOptions = { backdrop: false, initialState: {track: track} };
    this.bsModalRef = this.modalService.show(PlaylistsModalComponent, options);
  }

  onPlayNext(track: Track) {
    this.store.dispatch(new playerActions.PlayerPlayNext({track: track}))
  }

  onPlayLater(track: Track) {
    this.store.dispatch(new playerActions.PlayerPlayLater({track: track}))
  }

}
