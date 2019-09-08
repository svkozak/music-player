import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsModalComponent } from './playlists-modal.component';

describe('PlaylistsModalComponent', () => {
  let component: PlaylistsModalComponent;
  let fixture: ComponentFixture<PlaylistsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
