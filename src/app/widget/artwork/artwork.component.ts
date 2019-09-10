import { Album } from './../../models/album.model';
import { Playlist } from './../../models/playlist.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss']
})
export class ArtworkComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() selectedPlaylist: Playlist;
  @Input() selectedAlbum: Album;
  @Input() artworkUrl: string;

  @Output() onPlayAll: EventEmitter<any> = new EventEmitter();
  @Output() onStop: EventEmitter<any> = new EventEmitter();

  @Output() onAddToLibrary: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {}

  onPlayAlbum(album: Album) {
    this.onPlayAll.emit(album);
  }

  onPlayPlaylist(playlist: Playlist) {
    this.onPlayAll.emit(playlist);
  }

  onStopPressed(stop: any) {
    this.onStop.emit(stop);
  }

  addToLibrary(album?: Album, playlist?: Playlist) {
    console.log('Artwork component: adding to library', album || playlist)
    this.onAddToLibrary.emit(album || playlist);
  }

  parseDate(dateString: string, includeDay: boolean = false): string {
    const event = new Date(dateString);
    const options = includeDay ? { year: 'numeric', month: 'short', day: 'numeric'} : { year: 'numeric', month: 'short'};
    return event.toLocaleString([], options);
  }

}
