import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnOffSensorComponent } from './on-off-sensor.component';

describe('OnOffSensorComponent', () => {
  let component: OnOffSensorComponent;
  let fixture: ComponentFixture<OnOffSensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnOffSensorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnOffSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
