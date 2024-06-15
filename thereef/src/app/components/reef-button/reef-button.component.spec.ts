import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReefButtonComponent } from './reef-button.component';

describe('ReefButtonComponent', () => {
  let component: ReefButtonComponent;
  let fixture: ComponentFixture<ReefButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReefButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReefButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button with default label', () => {
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('');
  });

  it('should render the button with provided label', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Test Label');
  });

  it('should emit clicked event when button is clicked', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();
    expect(spy).toHaveBeenCalled();
  });
});
