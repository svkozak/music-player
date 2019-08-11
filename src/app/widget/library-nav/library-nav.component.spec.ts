import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryNavComponent } from './library-nav.component';

describe('LibraryNavComponent', () => {
  let component: LibraryNavComponent;
  let fixture: ComponentFixture<LibraryNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
