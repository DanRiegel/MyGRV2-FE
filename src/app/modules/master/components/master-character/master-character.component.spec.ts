import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCharacterComponent } from './master-character.component';

describe('MasterCharacterComponent', () => {
  let component: MasterCharacterComponent;
  let fixture: ComponentFixture<MasterCharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterCharacterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
