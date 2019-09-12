import { Playlist } from './../../models/playlist.model';
import { Album } from './../../models/album.model';
import { selectSelectedCatalogArtist } from './../state/browse.selectors';
import { Artist } from './../../models/artist.model';
import { ApiServiceService } from './../../services/api-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { map} from 'rxjs/operators';
import * as browseActions from '../state/browse.actions';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {

  isLoading: boolean = false;
  selectedArtist: Artist;

  constructor(
    private store: Store<any>,
    private route: ActivatedRoute,
    private api: ApiServiceService,
    private router: Router
    ) {

    }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(id => this.store.dispatch(new browseActions.LoadCatalogArtist({id: id})));
    this.store.select(selectSelectedCatalogArtist).subscribe(artist => this.selectedArtist = artist);
  }

  onAlbumSelected(album: Album) {
    this.router.navigate(['browse/albums', album.id]);
  }

  onPlaylistSelected(playlist: Playlist) {
    this.router.navigate(['browse/playlists', playlist.id]);
  }

  getArtistRelationships(event) {
    console.log(event);
    this.api.getCatalogArtistRelatioship(this.selectedArtist.id, event)
  }



}
