import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantEventSubscriptionComponent } from './accountant-event-subscription.component';

describe('AccountantEventSubscriptionComponent', () => {
  let component: AccountantEventSubscriptionComponent;
  let fixture: ComponentFixture<AccountantEventSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantEventSubscriptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantEventSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
