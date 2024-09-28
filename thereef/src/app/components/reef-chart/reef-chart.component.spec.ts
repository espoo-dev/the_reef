import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReefChartComponent } from './reef-chart.component';

describe('ReefChartComponent', () => {
  let component: ReefChartComponent;
  let fixture: ComponentFixture<ReefChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReefChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReefChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
