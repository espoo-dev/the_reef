import { Component, Input } from '@angular/core';
import { OnOffActuator } from '../../../domain/models/OnOffSensor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actuator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actuator.component.html',
  styleUrl: './actuator.component.scss'
})
export class ActuatorComponent {
  @Input() config!: OnOffActuator;
}
