import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() size: 'small' | 'medium' | 'large' | 'extra-large' = 'medium';
  @Input() title: string = 'Modal Title';
  @Input() contentTemplate!: TemplateRef<any>;
  @Output() closeModal = new EventEmitter<void>();

  get modalSizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'max-w-md';
      case 'medium':
        return 'max-w-2xl';
      case 'large':
        return 'max-w-4xl';
      case 'extra-large':
        return 'max-w-6xl';

      default:
        return 'max-w-2xl';
    }
  }
}
