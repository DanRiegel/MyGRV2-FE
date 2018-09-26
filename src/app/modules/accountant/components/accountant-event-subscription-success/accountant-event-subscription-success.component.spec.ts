import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantEventSubscriptionSuccessComponent } from './accountant-event-subscription-success.component';

describe('AccountantEventSubscriptionSuccessComponent', () => {
  let component: AccountantEventSubscriptionSuccessComponent;
  let fixture: ComponentFixture<AccountantEventSubscriptionSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantEventSubscriptionSuccessComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AccountantEventSubscriptionSuccessComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
