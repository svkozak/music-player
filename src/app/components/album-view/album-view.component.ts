import { LoadAlbum } from './../../state/actions/album.actions';
import { selectAlbumTracks, selectIsLoading } from './../../state/selectors/album.selectors';
import { Store } from '@ngrx/store';
import { Track } from './../../models/track.model';
import { ApiServiceService } from './../../services/api-service.service';
import { Album } from './../../models/album.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';
import { selectSelectedAlbum } from 'src/app/state/selectors/album.selectors';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  selectedAlbum: Album;
  tracks: Track[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>
    ) { }

  ngOnInit() {
    this.route.params.pipe(map(param => param.id)).subscribe(val => this.store.dispatch(new LoadAlbum({id: val})));
    this.store.select(selectSelectedAlbum).subscribe(album => this.selectedAlbum = album);
    this.store.select(selectIsLoading).subscribe(val => this.isLoading = val);
    this.store.select(selectAlbumTracks).subscribe(tracks => this.tracks = tracks);
  }

  ngOnDestroy() {
  }


}
