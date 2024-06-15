import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { SensorRepository } from '../infrastructure/repositories/SensorRepository';
import { Sensor } from '../domain/models/Sensor';

jest.mock('../infrastructure/repositories/SensorRepository');

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sensorRepository: jest.Mocked<SensorRepository>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        SensorRepository,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    sensorRepository = TestBed.inject(SensorRepository) as jest.Mocked<SensorRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSensors on ngOnInit and log response', () => {
    const dummySensors: Sensor[] = [
      { id: 'a2134', name: 'Sensor 1', value: true },
      { id: '12323', name: 'Sensor 2', value: true }
    ];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    sensorRepository.getSensors.mockReturnValue(of(dummySensors));

    component.ngOnInit();

    expect(sensorRepository.getSensors).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('response -> ', dummySensors);

    consoleSpy.mockRestore();
  });
});
