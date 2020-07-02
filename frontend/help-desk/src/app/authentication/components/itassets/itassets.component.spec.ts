import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItassetsComponent } from './itassets.component';

describe('ItassetsComponent', () => {
  let component: ItassetsComponent;
  let fixture: ComponentFixture<ItassetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItassetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
