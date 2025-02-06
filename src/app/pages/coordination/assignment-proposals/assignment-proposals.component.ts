import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ComissionService } from '@/app/services/comission.service';
import { PeriodService } from '@/app/services/period.service';
import { ProposalService } from '@/app/services/proposal.service';
import { ReviewService } from '@/app/services/review.service';
import { DialogSwal } from '@/app/shared/Swal';

type TMemberTable = {
  id: string;
  id_person: string;
  name: string;
  faculty: string;
  status: string;
  role_comission: string;
};

type TProposalTable = {
  id: string;
  document: string;
  name: string;
  option: string;
  category: string; //rubro
  statusApplication: string;
  practicesValidities: string;
  viculationValidities: string;
};

@Component({
  selector: 'app-assignment-proposals',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule],
  templateUrl: './assignment-proposals.component.html',
  styleUrl: './assignment-proposals.component.css',
})
export class AssignmentProposalsComponent {
  isModalDetailOpen = false;

  data = signal<TMemberTable[]>([]);
  columns: ColumnDef<TMemberTable>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'faculty',
      header: 'Facultad',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'role_comission',
      header: 'Rol',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'status',
      header: 'Estado',
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

  periods: any[] = [];
  selectedPeriod: any = null;
  isLoadEnabled: boolean = false;
  dataProposal = signal<TProposalTable[]>([]);
  columnsProposal: ColumnDef<TProposalTable>[] = [
    {
      accessorKey: 'document',
      header: 'Cédula',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'name',
      header: 'Estudiante',
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
      accessorKey: 'statusApplication',
      header: 'Estado Solicitud',
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
      id: 'actions',
      header: 'Acciones',
      cell: (info) => info.row.original,
      enableColumnFilter: false,
    },
  ];
  dialogSwal = DialogSwal();
  selectedCommissionMemberId: string = '';

  constructor(
    private comissionService: ComissionService,
    private periodService: PeriodService,
    private proposalService: ProposalService,
    private reviewService: ReviewService
  ) {}

  actionsConfig = {
    detail: true,
    edit: false,
    delete: false,
  };

  actionsConfigProposal = {
    detail: true,
    edit: false,
    delete: false,
  };

  ngOnInit(): void {
    this.loadReviewers();
  }

  private loadReviewers(): void {
    this.comissionService.getReviewersByDocument().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.data.set(response.data);
        } else {
          console.error('Error al cargar los revisores:', response.message);
        }
      },
      (error) => {
        console.error('Error al cargar los revisores:', error);
      }
    );
  }

  toggleDetailModal() {
    this.isModalDetailOpen = !this.isModalDetailOpen;

    if (!this.isModalDetailOpen) {
      this.selectedPeriod = null;
      this.dataProposal.set([]);
    } else {
      this.loadPeriods();
    }
  }
  private loadPeriods(): void {
    this.periodService.findAll().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.periods = response.data;
        } else {
          console.error('Error al cargar los periodos:', response.message);
        }
      },
      (error) => {
        console.error('Error al cargar los periodos:', error);
      }
    );
  }

  onDetail(row: TMemberTable): void {
    this.selectedCommissionMemberId = row.id;
    this.toggleDetailModal();
  }

  onPeriodChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedPeriod = this.periods.find(
      (period) => period.id === selectedId
    );
    if (this.selectedPeriod) {
      this.loadProposals(this.selectedPeriod.id);
    }
  }

  private loadProposals(periodId: string): void {
    this.proposalService.findAll(periodId).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.dataProposal.set(response.data);
        } else {
          console.error('Error al cargar propuestas:', response.message);
        }
      },
      (error) => {
        console.error('Error al cargar propuestas:', error);
      }
    );
  }

  onAssignProposal(proposal: TProposalTable, commissionMemberId: string): void {
    const reviewData = {
      idComissionMember: commissionMemberId,
      idProposal: proposal.id,
    };

    this.reviewService.create(reviewData).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.dialogSwal.Alert({
            title: 'Asignación Exitosa',
            text: 'La propuesta ha sido asignada correctamente.',
            icon: 'success',
          });
        } else {
          this.dialogSwal.Alert({
            title: 'Error en la Asignación',
            text:
              response.message || 'Ocurrió un error al asignar la propuesta.',
            icon: 'error',
          });
        }
      },
      (error) => {
        this.dialogSwal.Alert({
          title: 'Error en la Asignación',
          text:
            error?.error?.message ||
            'Ocurrió un error al comunicarse con el servidor.',
          icon: 'error',
        });
        console.error('Error en la asignación:', error);
      }
    );
  }
}
