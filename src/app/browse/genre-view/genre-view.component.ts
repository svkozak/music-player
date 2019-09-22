import { PlaylistsModalComponent } from './../../widget/playlists-modal/playlists-modal.component';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Album } from './../../models/album.model';
import { Genre } from './../../models/genre.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map} from 'rxjs/operators';
import { selectSelectedGenre, selectIsBrowseLoading, selectGenres } from '../state/browse.selectors';
import { LoadCatalogGenre } from '../state/browse.actions';
import { Playlist } from 'src/app/models/playlist.model';
import { Track } from 'src/app/models/track.model';
import { selectNowPlayingItem } from 'src/app/player/state/player.selectors';
import * as libraryActions from '../../library/state/library.actions';
import * as playerActions from '../../player/state/player.actions';
import { selectIsLoggedIn } from 'src/app/state/app.selectors';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  isLoggedIn: boolean;
  isLoading: boolean;
  genreId: string;
  genre: Genre;
  selectedGenre: Genre;
  playlists: Playlist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  nowPlayingTrackId;
  bsModalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.store.select(selectIsBrowseLoading).subscribe(isLoading => this.isLoading = isLoading);
    this.route.params.pipe(map(param => param.id)).subscribe(id => {
      this.genreId = id;
      this.store.dispatch(new LoadCatalogGenre({id: id}));
    });
    this.store.select(selectSelectedGenre).subscribe(genre => {
      if (genre && genre.relationships) {
        this.playlists = genre.relationships.playlists[0].data ? genre.relationships.playlists[0].data : [];
        this.albums = genre.relationships.albums[0].data ? genre.relationships.albums[0].data : [];
        this.tracks = genre.relationships.songs[0].data ? genre.relationships.songs[0].data : [];
      }
    });
    this.store.select(selectGenres).subscribe(genres => {
      if (this.genreId) {
        this.genre = genres.find(genre => genre.id === this.genreId);
      }
    });
    this.store.select(selectNowPlayingItem).subscribe(item => {
      if (item) {
        this.nowPlayingTrackId = item.id;
      }
    });
  }

  

  onAlbumSelected(album: Album) {
    this.router.navigate(['browse/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate(['browse/playlists', playlist.id]);
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
