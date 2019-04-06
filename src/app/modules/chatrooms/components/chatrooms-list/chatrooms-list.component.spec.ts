import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomsListComponent } from './chatrooms-list.component';

describe('ChatroomsListComponent', () => {
  let component: ChatroomsListComponent;
  let fixture: ComponentFixture<ChatroomsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
