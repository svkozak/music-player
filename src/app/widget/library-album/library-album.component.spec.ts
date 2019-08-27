import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAlbumComponent } from './library-album.component';

describe('LibraryAlbumComponent', () => {
  let component: LibraryAlbumComponent;
  let fixture: ComponentFixture<LibraryAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
