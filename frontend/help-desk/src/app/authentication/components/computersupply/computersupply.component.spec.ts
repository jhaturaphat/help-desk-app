import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersupplyComponent } from './computersupply.component';

describe('ComputersupplyComponent', () => {
  let component: ComputersupplyComponent;
  let fixture: ComponentFixture<ComputersupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
