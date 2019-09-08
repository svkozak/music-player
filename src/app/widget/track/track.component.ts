import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';
import { Track } from './../../models/track.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

@Output() onSelectTrack: EventEmitter<any> = new EventEmitter();
@Output() onAddToLibrary: EventEmitter<any> = new EventEmitter();
@Output() onAddToPlaylist: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(track: Track) {
    this.onSelectTrack.emit(track);
  }

  addToLibrary(track: Track) {
    console.log('track to add', track);
    this.onAddToLibrary.emit(track);
  }

  addToPlaylist(track: Track) {
    console.log('Add to playlist');
    this.onAddToPlaylist.emit(track);
  }

}
