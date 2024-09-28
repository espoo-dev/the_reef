import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSensorComponent } from './range-sensor.component';

describe('RangeSensorComponent', () => {
  let component: RangeSensorComponent;
  let fixture: ComponentFixture<RangeSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
