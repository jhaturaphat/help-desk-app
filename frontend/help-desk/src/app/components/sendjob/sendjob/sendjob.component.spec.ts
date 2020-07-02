import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendjobComponent } from './sendjob.component';

describe('SendjobComponent', () => {
  let component: SendjobComponent;
  let fixture: ComponentFixture<SendjobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendjobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
