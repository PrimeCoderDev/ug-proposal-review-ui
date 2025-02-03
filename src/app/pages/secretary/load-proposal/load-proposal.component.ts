import { Component, signal, OnInit } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { DialogSwal } from '@/app/shared/Swal';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ProposalService } from '@/app/services/proposal.service';
import { PeriodService } from '@/app/services/period.service';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-load-proposal',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule, FormsModule],
  templateUrl: './load-proposal.component.html',
  styleUrl: './load-proposal.component.css',
})
export class LoadProposalComponent implements OnInit {
  data = signal<TProposalTable[]>([]);
  columns: ColumnDef<TProposalTable>[] = [
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
      header: 'Viculación Validadas',
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
    edit: true,
    delete: false,
  };

  dialogSwal = DialogSwal();
  isModalDetailOpen = false;
  isModalAddOpen = false;
  isModalEditOpen = false;

  periods: any[] = [];
  selectedPeriod: any = null;
  isLoadEnabled: boolean = false;

  files: any[] = [];
  selectedFile: string | null = null;
  isFileLoadEnabled: boolean = false;

  showTable: boolean = false;

  selectedProposalDetail: any = null;

  partnerSearchResult: any = null;
  isSaveEnabled: boolean = false;

  editForm = {
    document: '',
    title: '',
    modality: '',
    researchLine: '',
    researchSubline: '',
    topic: '',
  };

  constructor(
    private proposalService: ProposalService,
    private periodService: PeriodService
  ) {}

  ngOnInit(): void {
    this.loadPeriods();
  }

  loadPeriods(): void {
    this.periodService.findAll().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.periods = response.data;
        }
      },
      (error) => {
        console.error('Error fetching periods:', error);
      }
    );
  }

  loadFiles(): void {
    this.proposalService.findAllFile().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.files = response.data;
        }
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
  }

  checkTableVisibility(): void {
    this.showTable =
      !this.selectedPeriod?.available_load || this.data().length > 0;
  }

  onPeriodChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selected = this.periods.find((period) => period.id === selectedId);
    this.selectedPeriod = selected;

    this.isLoadEnabled = selected?.available_load || false;
    this.checkTableVisibility();

    if (!this.isLoadEnabled && this.selectedPeriod) {
      this.loadTableData(this.selectedPeriod.id);
    }
  }

  loadTableData(periodId: string): void {
    this.proposalService.findAll(periodId).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.data.set(response.data);
        } else {
          console.error('Error fetching table data:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching table data:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const selectedFileId = (event.target as HTMLSelectElement).value;

    this.selectedFile =
      this.files.find((file) => file === selectedFileId) || null;

    this.isFileLoadEnabled = !!this.selectedFile;
  }

  onFileUpload(): void {
    console.log('Cargar archivo:', this.selectedFile);

    if (this.selectedFile && this.selectedPeriod?.id) {
      const data = {
        filename: this.selectedFile,
        periodId: this.selectedPeriod.id,
      };

      this.proposalService.processFile(data).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dialogSwal.Alert({
              title: 'Archivo cargado',
              text: 'El archivo se ha cargado correctamente',
              icon: 'success',
            });

            this.loadPeriods();
          } else {
            this.dialogSwal.Alert({
              title: 'Error al cargar el archivo',
              text: response.message,
              icon: 'error',
            });
          }
          this.toggleAddModal();
        },
        (error) => {
          console.error('Error al cargar el archivo:', error);
        }
      );
    }
  }

  toggleAddModal() {
    if (!this.isModalAddOpen) {
      this.loadFiles();
    }
    this.isModalAddOpen = !this.isModalAddOpen;
  }

  toggleDetailModal(): void {
    this.isModalDetailOpen = !this.isModalDetailOpen;
  }

  toggleEditModal() {
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  onEdit(row: TProposalTable): void {
    if (row.id) {
      this.proposalService.findDetail(row.id).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.selectedProposalDetail = response.data;
            this.editForm.title = response.data?.proposal.title_obtain || '';
            this.editForm.researchLine =
              response.data?.proposal.research_line || '';
            this.editForm.researchSubline =
              response.data?.proposal.research_subline || '';
            this.editForm.topic = response.data?.proposal.title || '';
            this.editForm.document = response.data?.partner?.document ?? '';
            this.partnerSearchResult = null;
            this.isSaveEnabled = false;

            this.toggleEditModal(); // Abrir el modal de edición
          } else {
            this.dialogSwal.Alert({
              title: 'Error',
              text: 'No se pudo cargar el detalle de la propuesta.',
              icon: 'error',
            });
          }
        },
        (error) => {
          console.error('Error fetching proposal detail:', error);
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'Ocurrió un error al obtener el detalle de la propuesta.',
            icon: 'error',
          });
        }
      );
    }
  }

  onSearchPartner(): void {
    const document = this.editForm.document.trim();
    if (document) {
      this.proposalService.findPartner(document).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.partnerSearchResult = response.data;
            this.isSaveEnabled = true;
            this.dialogSwal.Alert({
              title: 'Éxito',
              text: 'Estudiante par encontrado exitosamente.',
              icon: 'success',
            });
          } else {
            this.partnerSearchResult = null;
            this.isSaveEnabled = false;
            this.dialogSwal.Alert({
              title: 'Error',
              text: 'Estudiante par no encontrado.',
              icon: 'error',
            });
          }
        },
        (error) => {
          console.error('Error fetching partner:', error);
          this.isSaveEnabled = false;
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'Ocurrió un error al buscar el estudiante par.',
            icon: 'error',
          });
        }
      );
    }
  }

  onSave(): void {
    if (this.selectedProposalDetail && this.partnerSearchResult) {
      const proposalId = this.selectedProposalDetail.proposal.id;

      if (!proposalId) {
        console.error('El ID de la propuesta no está definido');
        this.dialogSwal.Alert({
          title: 'Error',
          text: 'No se puede guardar porque el ID de la propuesta no está definido.',
          icon: 'error',
        });
        return;
      }

      const data = {
        title: this.editForm.topic,
        modality: 'Proyecto de investigación',
        research_line: this.editForm.researchLine,
        research_subline: this.editForm.researchSubline,
        id_proposal: proposalId,
        id_person: this.partnerSearchResult.id,
        title_obtain: this.editForm.title,
      };

      this.proposalService.update(proposalId, data).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.dialogSwal.Alert({
              title: 'Éxito',
              text: 'Propuesta actualizada correctamente.',
              icon: 'success',
            });
            this.toggleEditModal();
            this.loadTableData(this.selectedPeriod.id);
          } else {
            this.dialogSwal.Alert({
              title: 'Error',
              text: 'No se pudo actualizar la propuesta.',
              icon: 'error',
            });
          }
        },
        (error) => {
          console.error('Error updating proposal:', error);
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'Ocurrió un error al actualizar la propuesta.',
            icon: 'error',
          });
        }
      );
    }
  }

  onDetail(row: TProposalTable): void {
    if (row.id) {
      this.proposalService.findDetail(row.id).subscribe(
        (response) => {
          if (response.status === 'success') {
            this.selectedProposalDetail = response.data;
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
          console.error('Error fetching proposal detail:', error);
          this.dialogSwal.Alert({
            title: 'Error',
            text: 'Ocurrió un error al obtener el detalle de la propuesta.',
            icon: 'error',
          });
        }
      );
    }
  }
}
