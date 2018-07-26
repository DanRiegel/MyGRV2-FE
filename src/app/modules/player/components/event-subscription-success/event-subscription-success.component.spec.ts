import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubscriptionSuccessComponent } from './event-subscription-success.component';

describe('EventSubscriptionSuccessComponent', () => {
  let component: EventSubscriptionSuccessComponent;
  let fixture: ComponentFixture<EventSubscriptionSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubscriptionSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubscriptionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
