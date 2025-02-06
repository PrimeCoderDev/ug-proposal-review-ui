import { Component, signal, OnInit } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ReviewService } from '@/app/services/review.service';
import { ProposalService } from '@/app/services/proposal.service';
import { FormsModule } from '@angular/forms';
import { DialogSwal } from '@/app/shared/Swal';

type TProposalTable = {
  title: string;
  title_obtain: string;
  modality: string;
  research_line: string;
  research_subline: string;
  option: string;
  category: string;
  practicesValidities: string;
  viculationValidities: string;
  statusApplication: string;
};

@Component({
  selector: 'app-review-proposals',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule, FormsModule],
  templateUrl: './review-proposals.component.html',
  styleUrl: './review-proposals.component.css',
})
export class ReviewProposalsComponent implements OnInit {
  data = signal<TProposalTable[]>([]);
  columns: ColumnDef<TProposalTable>[] = [
    {
      accessorKey: 'title',
      header: 'Tema',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'title_obtain',
      header: 'Titulo a Obtener',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'modality',
      header: 'Modalidad',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'research_line',
      header: 'Linea de Investigación',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'research_subline',
      header: 'Sublinea de Investigación',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'option',
      header: 'Opción',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'category',
      header: 'Rubro',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'practicesValidities',
      header: 'Practicas Validadas',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'viculationValidities',
      header: 'Vinculación Validadas',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'statusApplication',
      header: 'Estado de la Solicitud',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: (info) => info.row.original,
      enableColumnFilter: false,
    },
  ];
  actionsConfig = {
    detail: true,
    edit: false,
    delete: false,
  };

  isModalDetailOpen = false;
  proposalDetail: any = null;
  principalDetail: any = null;
  partnerDetail: any = null;

  selectedReview: string | null = null;
  selectedStatus: string = '';
  comment: string = '';

  dialogSwal = DialogSwal();

  constructor(
    private reviewService: ReviewService,
    private proposalService: ProposalService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.reviewService.getReviewsByDocument().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.data.set(response.data);
        } else {
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'No se pudieron cargar las revisiones.',
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error al cargar las revisiones:', error);
      }
    );
  }

  toggleDetailModal(): void {
    this.isModalDetailOpen = !this.isModalDetailOpen;
  }

  onDetail(row: any): void {
    this.selectedReview = row.idReview;
    this.proposalService.findDetail(row.id).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.proposalDetail = response.data.proposal;
          this.principalDetail = response.data.principal;
          this.partnerDetail = response.data.partner;
          this.toggleDetailModal();
        } else {
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'No se pudo cargar el detalle de la propuesta.',
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error al cargar el detalle:', error);
      }
    );
  }

  saveResolution(): void {
    if (!this.selectedStatus || !this.comment.trim()) {
      this.dialogSwal.Alert({
        title: 'Campos requeridos',
        text: 'Por favor complete todos los campos obligatorios.',
        icon: 'warning',
      });
      return;
    }

    const updateData = {
      idComissionMember: this.proposalDetail.id_comision_member,
      idProposal: this.proposalDetail.id,
      comment: this.comment.trim(),
      statusApplication: this.selectedStatus,
    };

    this.reviewService.update(this.selectedReview!, updateData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.dialogSwal.Alert({
            title: 'Éxito',
            text: 'Resolución guardada correctamente.',
            icon: 'success',
          });
          this.toggleDetailModal();
          this.loadData();
        } else {
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'No se pudo guardar la resolución.',
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error al guardar la resolución:', error);
        this.dialogSwal.Alert({
          title: 'Error',
          text: 'Ocurrió un error al guardar la resolución.',
          icon: 'error',
        });
      }
    );
  }
}
