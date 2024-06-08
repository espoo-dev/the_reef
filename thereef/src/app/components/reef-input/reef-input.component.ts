import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'reef-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reef-input.component.html',
  styleUrl: './reef-input.component.scss'
})
export class ReefInputComponent {
  @Input() placeholder: string = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter();

  inputValue!: string;

  onInputChange(): void {
    this.valueChanged.emit(this.inputValue);
  }
}
