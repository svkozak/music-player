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

  @Output() albumDetails: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(album: Album) {
    console.log(album.href);
    this.albumDetails.emit(album.href);
  }

}
