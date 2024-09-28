import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'reef-on-off-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './on-off-sensor.component.html',
  styleUrl: './on-off-sensor.component.scss'
})
export class OnOffSensorComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() currentOnOffValue!: boolean;

  private loading = false;
}
