import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { DialogSwal } from '@/app/shared/Swal';
import { ModalComponent } from '@/components/modal/modal.component';
import { CommonModule } from '@angular/common';

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
  imports: [TableComponent, ModalComponent, CommonModule],
  templateUrl: './load-proposal.component.html',
  styleUrl: './load-proposal.component.css',
})
export class LoadProposalComponent {
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

  constructor() {
    this.data.set([
      {
        id: '1',
        document: '1234567890',
        name: 'JUAN PEREZ',
        option: 'TRABAJO DE TITUACIÓN',
        category: 'Rubro 11',
        statusApplication: 'PENDIENTE',
        practicesValidities: '0',
        viculationValidities: '0',
      },
      {
        id: '2',
        document: '0987654321',
        name: 'MARIA ESCOBAR',
        option: 'TRABAJO DE TITUACIÓN',
        category: 'Rubro 3',
        statusApplication: 'DEVUELTO',
        practicesValidities: '240',
        viculationValidities: '160',
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

  onEdit(row: TProposalTable) {
    console.log('Editar:', row);
    this.toggleEditModal();
  }

  onDetail(row: TProposalTable) {
    console.log('Detalle:', row);
    this.toggleDetailModal();
  }
}
