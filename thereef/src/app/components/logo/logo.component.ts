import { Component, Input } from '@angular/core';

@Component({
  selector: 'reef-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() outFillColor: string = '#fb93a8';
  @Input() innerFillColor: string = '#e5faff';

  size = 46;
}
