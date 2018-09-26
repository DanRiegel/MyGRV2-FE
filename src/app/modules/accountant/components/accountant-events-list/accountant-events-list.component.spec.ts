import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantEventsListComponent } from './accountant-events-list.component';

describe('AccountantEventsListComponent', () => {
  let component: AccountantEventsListComponent;
  let fixture: ComponentFixture<AccountantEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
