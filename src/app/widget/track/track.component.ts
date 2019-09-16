import { PlaybackStates } from './../../models/player.models';
import { Store } from '@ngrx/store';
import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';
import { Track } from './../../models/track.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { selectIsLoggedIn } from 'src/app/state/app.selectors';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

@Input() selectedAlbum: Album;
@Input() selectedPlaylist: Playlist;
@Input() track: Track;
@Input() isNowPlaying: boolean;
@Input() timeRemaining: number;
@Input() searchResult: boolean = false;
@Input() isLibraryLoading: boolean = false;
@Input() isLoggedIn: boolean;

@Output() onSelectTrack: EventEmitter<any> = new EventEmitter();
@Output() onAddToLibrary: EventEmitter<any> = new EventEmitter();
@Output() onAddToPlaylist: EventEmitter<any> = new EventEmitter();
@Output() onPlayNext: EventEmitter<any> = new EventEmitter();
@Output() onPlayLater: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(selectIsLoggedIn).subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  onClick(track: Track) {
    this.onSelectTrack.emit(track);
  }

  addToLibrary(track: Track) {
    this.onAddToLibrary.emit(track);
  }

  addToPlaylist(track: Track) {
    this.onAddToPlaylist.emit(track);
  }

  playNext(track: Track) {
    this.onPlayNext.emit(track);
  }

  playLater(track: Track) {
    this.onPlayLater.emit(track);
  }

}
