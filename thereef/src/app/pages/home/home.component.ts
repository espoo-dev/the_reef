import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SensorComponent, SensorStatusType, SensorType } from '../../components/sensor/sensor.component';
import { AquariaRepository } from '../../../infrastructure/repositories/AquariaRepository';
import { Aquaria } from '../../../domain/models/Aquaria';
import { OnOffSensorRepository } from '../../../infrastructure/repositories/OnOffSensorRepository';
import { OnOffSensor } from '../../../domain/models/OnOffSensor';
import { OnOffSensorComponent } from '../../components/on-off-sensor/on-off-sensor.component';
import { ChartConfiguration } from 'chart.js';
import { ReefChartComponent } from '../../components/reef-chart/reef-chart.component';
import { RangeSensorRepository } from '../../../infrastructure/repositories/RangeSensorRepository';
import { RangeSensor, RangeValue } from '../../../domain/models/RangeSensor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, SensorComponent, OnOffSensorComponent, ReefChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public sensors: SensorType[] = [];
  public aquaria!: Aquaria;
  public boyuStatus!: any;
  public onOffSensors: OnOffSensor[] = [];
  public rangeSensors: RangeSensor[] = [];
  private valuesToHistoric = 30;
  private brDateFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  };

  public temperatureChartHistoric: ChartConfiguration = {
    options: {
      interaction: {
        mode: 'index',
        intersect: false
      },
    },
    type: 'line',
    data: {
      labels: [],
      datasets: []
    }
  }

  constructor(
    private aquariaRepository: AquariaRepository,
    private onOffSensorRepository: OnOffSensorRepository,
    private rangeSensorRepository: RangeSensorRepository
  ){}

  loadOnOffSensors(){
    this.onOffSensorRepository.list({
      values_amount: this.valuesToHistoric
    })
      .subscribe((response) => {
        this.onOffSensors = response;
      })
  }

  loadRangeSensors(){
    this.rangeSensorRepository.list({
      values_amount: this.valuesToHistoric
    })
      .subscribe((response) => {
        this.rangeSensors = response;
        this.sensors = this.rangeSensors.map((rangeSensor) => {
          return {
            lastUpdate: rangeSensor.current_numeric_value.created_at,
            name: rangeSensor.name,
            value: rangeSensor.current_numeric_value.value,
            status: (Number(rangeSensor.current_numeric_value.value) > Number(rangeSensor.max_value))
               ? 'danger' : 'success' as SensorStatusType
          } as SensorType
        });

        this.temperatureChartHistoric = {
          ...this.temperatureChartHistoric,
          data: this.mountTemperatureHistoric(this.rangeSensors[0].numeric_values)
        }
      })
  }

  mountTemperatureHistoric(points: RangeValue[]): {labels: string[], datasets: any[]} {
    return {
      labels: points.map((point) => new Date(point.created_at).toLocaleString('pt-BR', this.brDateFormat)),
      datasets: [
        {
          label: 'Temperatura',
          data: points.map((point) => point.value)
        }
      ]
    }
  }

  loadAquariums() {
    this.aquariaRepository.list()
      .subscribe((response) => {
        this.aquaria = response[0];

        this.loadOnOffSensors();
        this.loadRangeSensors();
      })
  }

  ngOnInit() {
    const refreshInMinutes = 1 * 60000;
    this.loadAquariums();

    setInterval(() => {
      this.loadAquariums();
    }, refreshInMinutes)
  }
}
