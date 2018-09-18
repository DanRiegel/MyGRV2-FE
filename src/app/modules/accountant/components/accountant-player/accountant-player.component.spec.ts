import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantPlayerComponent } from './accountant-player.component';

describe('AccountantPlayerComponent', () => {
  let component: AccountantPlayerComponent;
  let fixture: ComponentFixture<AccountantPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantPlayerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
