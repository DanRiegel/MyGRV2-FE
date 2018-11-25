import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisorseUtiliComponent } from './risorse-utili.component';

describe('RisorseUtiliComponent', () => {
  let component: RisorseUtiliComponent;
  let fixture: ComponentFixture<RisorseUtiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisorseUtiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisorseUtiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
