import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReefInputComponent } from './reef-input.component';

describe('ReefInputComponent', () => {
  let component: ReefInputComponent;
  let fixture: ComponentFixture<ReefInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReefInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReefInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
