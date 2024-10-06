import { Component, Input, OnInit } from '@angular/core';
import { RangeSensor } from '../../../domain/models/RangeSensor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-range-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './range-sensor.component.html',
  styleUrl: './range-sensor.component.scss'
})
export class RangeSensorComponent implements OnInit {
  @Input() config!: RangeSensor;

  ngOnInit() {
    console.log('this.config -> ', this.config);
  }
}
