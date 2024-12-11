import { Component } from '@angular/core';
import { DialogSwal } from '@/app/shared/Swal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-correction-proposal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './correction-proposal.component.html',
  styleUrl: './correction-proposal.component.css',
})
export class CorrectionProposalComponent {
  success() {
    console.log('aaaa');

    const { Alert } = DialogSwal();
    Alert({
      icon: 'success',
      title: 'Propuesta actualizada correctamente',
      showConfirmButton: true,
      timer: 2000,
    });
  }
}
