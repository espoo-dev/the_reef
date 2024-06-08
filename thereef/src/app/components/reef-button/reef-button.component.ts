import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'reef-button',
  standalone: true,
  imports: [],
  templateUrl: './reef-button.component.html',
  styleUrl: './reef-button.component.scss'
})
export class ReefButtonComponent {
  @Input() label: string = '';
  @Output() clicked: EventEmitter<void> = new EventEmitter();
  @Input() type: 'primary' | 'secondary' = 'primary';

  onClick(): void {
    this.clicked.emit();
  }
}
