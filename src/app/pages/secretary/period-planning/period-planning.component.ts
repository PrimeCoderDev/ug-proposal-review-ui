import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { DialogSwal } from '@/app/shared/Swal';
import { ModalComponent } from '@/components/modal/modal.component';
import { CommonModule } from '@angular/common';

type TPeriodTable = {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
};

@Component({
  selector: 'app-period-planning',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule],
  templateUrl: './period-planning.component.html',
  styleUrl: './period-planning.component.css',
})
export class PeriodPlanningComponent {
  data = signal<TPeriodTable[]>([]);
  columns: ColumnDef<TPeriodTable>[] = [
    {
      accessorKey: 'description',
      header: 'Descripción',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'startDate',
      header: 'Fecha de inicio',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'endDate',
      header: 'Fecha de fin',
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
  actionsConfig = {
    detail: false,
    edit: true,
    delete: true,
  };

  dialogSwal = DialogSwal();
  isModalAddOpen = false;
  isModalEditOpen = false;

  constructor() {
    this.data.set([
      {
        id: '1',
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        description: 'Primer periodo',
        status: 'Inactivo',
      },
      {
        id: '2',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        description: 'Segundo periodo',
        status: 'Activo',
      },
    ]);
  }

  toggleAddModal() {
    this.isModalAddOpen = !this.isModalAddOpen;
  }

  toggleEditModal() {
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  onEdit(row: TPeriodTable) {
    console.log('Editar:', row);
    this.toggleEditModal();
  }

  onDelete(row: TPeriodTable) {
    console.log('Eliminar:', row);
    this.dialogSwal
      .Confirm({
        title: 'Eliminar periodo',
        text: '¿Está seguro de que desea eliminar este periodo?',
        icon: 'warning',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.data.update((current) =>
            current.map((item) =>
              item.id === row.id && item.status === 'Activo'
                ? { ...item, status: 'Inactivo' }
                : item
            )
          );
        }
      });
  }
}
