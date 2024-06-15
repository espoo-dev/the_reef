import { Component, Input } from '@angular/core';

export interface SensorType {
  value: string,
  name: string,
  lastUpdate: string,
  status: SensorStatusType
}

export type SensorStatusType = 'success' | 'warning' | 'danger';

@Component({
  selector: 'reef-sensor',
  standalone: true,
  imports: [],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.scss'
})
export class SensorComponent {
  @Input() value!: string | number;
  @Input() name!: string;
  @Input() lastUpdate!: string;
  @Input() status: SensorStatusType = 'success';
}
