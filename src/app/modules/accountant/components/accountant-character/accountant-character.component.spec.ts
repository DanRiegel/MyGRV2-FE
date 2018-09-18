import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantCharacterComponent } from './accountant-character.component';

describe('AccountantCharacterComponent', () => {
  let component: AccountantCharacterComponent;
  let fixture: ComponentFixture<AccountantCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantCharacterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
