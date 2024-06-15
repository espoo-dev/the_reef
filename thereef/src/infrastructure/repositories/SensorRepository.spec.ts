import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from '../instances/api';
import { Sensor } from '../../domain/models/Sensor';
import { SensorRepository } from './SensorRepository';

// Mock do ApiService
jest.mock('../instances/api');

describe('SensorRepository', () => {
  let sensorRepository: SensorRepository;
  let apiService: jest.Mocked<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SensorRepository,
        ApiService
      ]
    });

    sensorRepository = TestBed.inject(SensorRepository);
    apiService = TestBed.inject(ApiService) as jest.Mocked<ApiService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(sensorRepository).toBeTruthy();
  });

  it('should retrieve sensors via ApiService', (done) => {
    const dummySensors: Sensor[] = [
      { id: 'a2134', name: 'Sensor 1', value: true },
      { id: '12323', name: 'Sensor 2', value: true }
    ];

    apiService.get.mockReturnValue(of(dummySensors));

    sensorRepository.getSensors().subscribe(sensors => {
      expect(sensors).toEqual(dummySensors);
      expect(apiService.get).toHaveBeenCalledWith('pokemon');
      done();
    });
  });
});
