import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRootComponent } from './browse-root.component';

describe('BrowseRootComponent', () => {
  let component: BrowseRootComponent;
  let fixture: ComponentFixture<BrowseRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
