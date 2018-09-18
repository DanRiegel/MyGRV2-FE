import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantPlayersListComponent } from './accountant-players-list.component';

describe('AccountantPlayersListComponent', () => {
  let component: AccountantPlayersListComponent;
  let fixture: ComponentFixture<AccountantPlayersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantPlayersListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantPlayersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
