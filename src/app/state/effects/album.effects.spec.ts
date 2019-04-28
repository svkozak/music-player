import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AlbumEffects } from './album.effects';

describe('AlbumEffects', () => {
  let actions$: Observable<any>;
  let effects: AlbumEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlbumEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AlbumEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
