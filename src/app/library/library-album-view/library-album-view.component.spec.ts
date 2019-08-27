import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAlbumViewComponent } from './library-album-view.component';

describe('LibraryAlbumViewComponent', () => {
  let component: LibraryAlbumViewComponent;
  let fixture: ComponentFixture<LibraryAlbumViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryAlbumViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryAlbumViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
