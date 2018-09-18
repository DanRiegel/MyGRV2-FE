import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantCharactersListComponent } from './accountant-characters-list.component';

describe('AccountantCharactersListComponent', () => {
  let component: AccountantCharactersListComponent;
  let fixture: ComponentFixture<AccountantCharactersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantCharactersListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantCharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
