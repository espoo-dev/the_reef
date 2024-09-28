import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SensorComponent, SensorType } from '../../components/sensor/sensor.component';
import { AquariaRepository } from '../../../infrastructure/repositories/AquariaRepository';
import { Aquaria } from '../../../domain/models/Aquaria';
import { OnOffSensorRepository } from '../../../infrastructure/repositories/OnOffSensorRepository';
import { OnOffSensor } from '../../../domain/models/OnOffSensor';
import { OnOffSensorComponent } from '../../components/on-off-sensor/on-off-sensor.component';
import { ChartArea, ChartConfiguration } from 'chart.js';
import { ReefChartComponent } from '../../components/reef-chart/reef-chart.component';
import { RangeSensorRepository } from '../../../infrastructure/repositories/RangeSensorRepository';
import { RangeSensor, RangeValue } from '../../../domain/models/RangeSensor';
import { UITheme } from '../../theme';
import { OnOffActuatorRepository } from '../../../infrastructure/repositories/OnOffActuatorRepository';
import { RangeSensorComponent } from '../../components/range-sensor/range-sensor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SensorComponent, OnOffSensorComponent, ReefChartComponent, RangeSensorComponent],
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
      responsive: true,
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

  private loadDataInterval!: ReturnType<typeof setInterval>;

  constructor(
    private aquariaRepository: AquariaRepository,
    private onOffSensorRepository: OnOffSensorRepository,
    private rangeSensorRepository: RangeSensorRepository,
    private onOffActuatorRepository: OnOffActuatorRepository,
  ){}

  loadOnOffSensors(){
    this.onOffSensorRepository.list({
      values_amount: this.valuesToHistoric
    })
      .subscribe((response) => {
        this.onOffSensors = response;
      })
  }

  loadOnOffActuators(){
    this.onOffActuatorRepository.list({
      values_amount: this.valuesToHistoric
    })
      .subscribe((response) => {
        // TODO: add to actuators list
        // this.onOffSensors = response;
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
            status: rangeSensor.numeric_value_on_range ? 'success' : 'danger',
          }
        });

        this.temperatureChartHistoric = {
          ...this.temperatureChartHistoric,
          data: this.mountTemperatureHistoric(this.rangeSensors[0].numeric_values)
        }
      })
  }

  private getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {

      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, UITheme.successColor);
      gradient.addColorStop(1, UITheme.dangerColor);
    }

    return gradient;
  }

  mountTemperatureHistoric(points: RangeValue[]): { labels: string[], datasets: any[] } {
    return {
      labels: points.map((point) => new Date(point.created_at).toLocaleString('pt-BR', this.brDateFormat)),
      datasets: [
        {
          label: 'Temperatura',
          data: points.map((point) => point.value),
          tension: 0.4,
          borderColor: (context: any) => {
            const chart = context.chart;
            const {ctx, chartArea} = chart;

            if (!chartArea) {
              return;
            }
            return this.getGradient(ctx, chartArea);
          },
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
        this.loadOnOffActuators();
      })
  }

  ngOnInit() {
    const refreshInMinutes = 1 * 60000;
    this.loadAquariums();

    this.loadDataInterval = setInterval(() => {
      this.loadAquariums();
    }, refreshInMinutes);
  }

  ngOnDestroy() {
    clearInterval(this.loadDataInterval);
  };
}
