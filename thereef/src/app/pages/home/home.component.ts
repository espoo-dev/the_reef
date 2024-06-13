import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SensorComponent, SensorType } from '../../components/sensor/sensor.component';
import { AquariaRepository } from '../../../infrastructure/repositories/AquariaRepository';
import { Aquaria } from '../../../domain/models/Aquaria';
import { OnOffSensorRepository } from '../../../infrastructure/repositories/OnOffSensorRepository';
import { OnOffSensor } from '../../../domain/models/OnOffSensor';
import { OnOffSensorComponent } from '../../components/on-off-sensor/on-off-sensor.component';
import { ChartConfiguration } from 'chart.js';
import { ReefChartComponent } from '../../components/reef-chart/reef-chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, SensorComponent, OnOffSensorComponent, ReefChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public sensors: SensorType[] = [
    {
      value: '27.88 °C',
      name: 'Temperatura',
      lastUpdate: '09/06/24 19:28',
      status: 'success'
    },
    {
      value: '30.88 °C',
      name: 'Temperatura',
      lastUpdate: '10/06/24 19:33',
      status: 'danger'
    },
    {
      value: '30.88 °C',
      name: 'Temperatura',
      lastUpdate: '10/06/24 19:33',
      status: 'danger'
    },
    {
      value: '27.88 °C',
      name: 'Temperatura',
      lastUpdate: '09/06/24 19:28',
      status: 'success'
    },
    {
      value: '30.88 °C',
      name: 'Temperatura',
      lastUpdate: '10/06/24 19:33',
      status: 'danger'
    },
    {
      value: '27.88 °C',
      name: 'Temperatura',
      lastUpdate: '09/06/24 19:28',
      status: 'success'
    },
  ];
  public aquaria!: Aquaria;
  public boyuStatus!: any;
  public onOffSensors: OnOffSensor[] = [];
  private valuesToHistoric = 30;

  public temperatureChartHistoric: ChartConfiguration = {
    options: {
      interaction: {
        mode: 'index',
        intersect: false
      },
    },
    type: 'line',
    data: {
      labels: ['13/06'],
      datasets: [
        {
          label: 'Temperatura',
          data: [27.8]
        }
      ]
    }
  }

  constructor(
    private aquariaRepository: AquariaRepository,
    private onOffSensorRepository: OnOffSensorRepository
  ){}

  loadOnOffSensors(){
    this.onOffSensorRepository.list({
      values_amount: this.valuesToHistoric
    })
      .subscribe((response) => {
        this.onOffSensors = response;
      })
  }

  loadAquariums() {
    this.aquariaRepository.list()
      .subscribe((response) => {
        this.aquaria = response[0];

        this.loadOnOffSensors();
      })
  }

  ngOnInit() {
    const refreshInMinutes = 1 * 60000;

    setTimeout(() => {
      this.temperatureChartHistoric = {
        ...this.temperatureChartHistoric,
        data: {
          labels: ['16/06'],
          datasets: [
            {
              label: 'Temperatura',
              data: [31]
            }
          ]
        }
      }
    }, 200);

    this.loadAquariums();

    setInterval(() => {
      this.loadAquariums();
    }, refreshInMinutes)
  }
}
