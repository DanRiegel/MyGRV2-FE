import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCharactersListComponent } from './master-characters-list.component';

describe('MasterCharactersListComponent', () => {
  let component: MasterCharactersListComponent;
  let fixture: ComponentFixture<MasterCharactersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCharactersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCharactersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
