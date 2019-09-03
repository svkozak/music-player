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

@Output() onSelectTrack: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(track: Track) {
    this.onSelectTrack.emit(track);
  }

}
