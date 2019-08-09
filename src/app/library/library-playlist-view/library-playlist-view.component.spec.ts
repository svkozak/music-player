import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPlaylistViewComponent } from './library-playlist-view.component';

describe('LibraryPlaylistViewComponent', () => {
  let component: LibraryPlaylistViewComponent;
  let fixture: ComponentFixture<LibraryPlaylistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryPlaylistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryPlaylistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
