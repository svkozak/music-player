import { Album } from './../../models/album.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  @Input() album: Album;
  @Input() imgSrc: string;

  @Output() onSelectAlbum: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(album: Album) {
    console.log(`Emitting album ${album.href}`);
    this.onSelectAlbum.emit(album);
  }

}
