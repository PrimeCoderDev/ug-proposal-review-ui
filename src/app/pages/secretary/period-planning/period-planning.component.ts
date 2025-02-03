import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from '@/app/components/table/table.component';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { PeriodService } from '@/app/services/period.service';
import { DialogSwal } from '@/app/shared/Swal';
import { ColumnDef } from '@tanstack/angular-table';

type TPeriodTable = {
  id: string;
  start_date: string;
  end_date: string;
  description: string;
  status: string;
};

@Component({
  selector: 'app-period-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent, ModalComponent],
  templateUrl: './period-planning.component.html',
  styleUrls: ['./period-planning.component.css'],
})
export class PeriodPlanningComponent implements OnInit {
  data = signal<TPeriodTable[]>([]);
  columns: ColumnDef<TPeriodTable>[] = [
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'start_date',
      header: 'Fecha de inicio',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'end_date',
      header: 'Fecha de fin',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: (info) => {
        const status = info.getValue();

        return status === 'ACTIVE'
          ? 'Activo'
          : status === 'INACTIVE'
          ? 'Inactivo'
          : status;
      },
    },
    {
      accessorKey: 'actions',
      header: 'Acciones',
      cell: (info) => info.row.original,
      enableColumnFilter: false,
    },
  ];
  actionsConfig = {
    detail: false,
    edit: true,
    delete: true,
  };
  isModalAddOpen = false;
  isModalEditOpen = false;
  editingPeriod: TPeriodTable | null = null;

  dialogSwal = DialogSwal();

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.loadPeriods();
  }

  loadPeriods(): void {
    this.periodService.findAll().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.data.set(response.data);
        }
      },
      error: () => {
        this.dialogSwal.Alert({
          title: 'Error',
          text: 'Error al cargar los períodos.',
          icon: 'error',
        });
      },
    });
  }

  toggleAddModal(): void {
    this.isModalAddOpen = !this.isModalAddOpen;
  }

  toggleEditModal(): void {
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  savePeriod(periodData: any): void {
    if (this.editingPeriod) {
      this.periodService.update(this.editingPeriod.id, periodData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.loadPeriods();
            this.toggleEditModal();
            this.dialogSwal.Alert({
              title: '¡Éxito!',
              text:
                response.message || 'El período se actualizó correctamente.',
              icon: 'success',
            });
          }
        },
        error: (err) => {
          this.dialogSwal.Alert({
            title: 'Error',
            text:
              err.error?.message ||
              'Ocurrió un error al actualizar el período.',
            icon: 'error',
          });
        },
      });
    } else {
      this.periodService.create(periodData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.loadPeriods();
            this.toggleAddModal();
            this.dialogSwal.Alert({
              title: '¡Éxito!',
              text: response.message || 'El período se creó correctamente.',
              icon: 'success',
            });
          }
        },
        error: (err) => {
          this.dialogSwal.Alert({
            title: 'Error',
            text: err.error?.message || 'Ocurrió un error al crear el período.',
            icon: 'error',
          });
        },
      });
    }
  }

  onEdit(row: TPeriodTable): void {
    this.editingPeriod = row;
    this.toggleEditModal();
  }

  onDelete(row: TPeriodTable): void {
    this.dialogSwal
      .Confirm({
        title: 'Eliminar período',
        text: '¿Está seguro de que desea eliminar este período?',
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.periodService.remove(row.id).subscribe({
            next: (response) => {
              if (response.status === 'success') {
                this.loadPeriods();
                this.dialogSwal.Alert({
                  title: '¡Éxito!',
                  text:
                    response.message || 'El período se eliminó correctamente.',
                  icon: 'success',
                });
              }
            },
            error: (err) => {
              this.dialogSwal.Alert({
                title: 'Error',
                text:
                  err.error?.message ||
                  'Ocurrió un error al eliminar el período.',
                icon: 'error',
              });
            },
          });
        }
      });
  }
}
