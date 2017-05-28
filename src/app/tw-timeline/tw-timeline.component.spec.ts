import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwTimelineComponent } from './tw-timeline.component';

describe('TwTimelineComponent', () => {
  let component: TwTimelineComponent;
  let fixture: ComponentFixture<TwTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
