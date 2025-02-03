import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { ModalComponent } from '@/app/components/modal/modal.component';
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
  selector: 'app-review-proposals',
  standalone: true,
  imports: [TableComponent, ModalComponent, CommonModule],
  templateUrl: './review-proposals.component.html',
  styleUrl: './review-proposals.component.css',
})
export class ReviewProposalsComponent {
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
  actionsConfig = {
    detail: true,
    edit: false,
    delete: false,
  };

  isModalEditOpen = false;
  isModalDetailOpen = false;

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

  toggleDetailModal() {
    this.isModalDetailOpen = !this.isModalDetailOpen;
  }

  onDetail(row: TProposalTable) {
    console.log('Detalle:', row);
    this.toggleDetailModal();
  }
}
