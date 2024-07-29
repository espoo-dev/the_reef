import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReefIndicatorComponent } from './reef-indicator.component';

describe('ReefIndicatorComponent', () => {
  let component: ReefIndicatorComponent;
  let fixture: ComponentFixture<ReefIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReefIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReefIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
