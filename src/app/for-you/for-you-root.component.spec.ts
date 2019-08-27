import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForYouRootComponent } from './for-you-root.component';

describe('ForYouRootComponent', () => {
  let component: ForYouRootComponent;
  let fixture: ComponentFixture<ForYouRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForYouRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForYouRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
