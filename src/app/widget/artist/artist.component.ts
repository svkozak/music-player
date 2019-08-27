import { Artist } from './../../models/artist.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  @Input() artist: Artist;
  @Input() selectedArtist: Artist;

  @Output() onSelectArtist: EventEmitter<any> = new EventEmitter();
  @Output() onSelectAlbum: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(artist: Artist) {
    this.onSelectArtist.emit(artist);
  }

}
