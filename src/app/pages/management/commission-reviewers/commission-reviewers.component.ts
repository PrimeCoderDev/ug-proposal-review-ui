import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { DialogSwal } from '@/app/shared/Swal';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';

type TCommissionTable = {
  id: string;
  period: string;
  description: string;
  status: string;
};

@Component({
  selector: 'app-commission-reviewers',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule],
  templateUrl: './commission-reviewers.component.html',
  styleUrl: './commission-reviewers.component.css',
})
export class CommissionReviewersComponent {
  data = signal<TCommissionTable[]>([]);
  columns: ColumnDef<TCommissionTable>[] = [
    {
      accessorKey: 'period',
      header: 'Periodo',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'description',
      header: 'Descripción',
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
    detail: true,
    edit: true,
    delete: true,
  };

  dialogSwal = DialogSwal();
  isModalDetailOpen = false;
  isModalAddOpen = false;
  isModalEditOpen = false;

  constructor() {
    this.data.set([
      {
        id: '1',
        period: 'Primer periodo',
        description: 'Comision Medicina',
        status: 'Inactivo',
      },
      {
        id: '1',
        period: 'Segundo periodo',
        description: 'Comision Medicina',
        status: 'Activo',
      },
      {
        id: '2',
        period: 'Segundo periodo',
        description: 'Comision Ciencias Matematicas y Fisicas',
        status: 'Activo',
      },
    ]);
  }

  toggleAddModal() {
    this.isModalAddOpen = !this.isModalAddOpen;
  }

  toggleDetailModal() {
    this.isModalDetailOpen = !this.isModalDetailOpen;
  }

  toggleEditModal() {
    this.isModalEditOpen = !this.isModalEditOpen;
  }

  onDetail(row: TCommissionTable) {
    console.log('Detalle:', row);
    this.toggleDetailModal();
  }

  onEdit(row: TCommissionTable) {
    console.log('Editar:', row);
    this.toggleEditModal();
  }

  onDelete(row: TCommissionTable) {
    console.log('Eliminar:', row);
    this.dialogSwal
      .Confirm({
        title: 'Eliminar comision',
        text: '¿Está seguro de que desea eliminar esta comision?',
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
