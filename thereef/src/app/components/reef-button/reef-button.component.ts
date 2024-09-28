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
  @Input() disabled: boolean = false;
  @Input() type: 'primary' | 'secondary' = 'primary';

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.clicked.emit();
  }
}
