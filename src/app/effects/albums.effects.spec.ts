import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AlbumsEffects } from './albums.effects';

describe('AlbumsEffects', () => {
  let actions$: Observable<any>;
  let effects: AlbumsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlbumsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AlbumsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
