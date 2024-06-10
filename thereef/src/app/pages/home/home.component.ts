import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { SensorComponent, SensorStatusType, SensorType } from '../../components/sensor/sensor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, SensorComponent],
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
}
