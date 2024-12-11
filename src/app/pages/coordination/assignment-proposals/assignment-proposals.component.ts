import { Component, signal } from '@angular/core';
import { TableComponent } from '@/app/components/table/table.component';
import { ColumnDef } from '@tanstack/angular-table';
import { ModalComponent } from '@/components/modal/modal.component';
import { CommonModule } from '@angular/common';

type TMemberTable = {
  id: string;
  document: string;
  name: string;
  career: string;
  faculty: string;
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
      accessorKey: 'document',
      header: 'Cedula',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: (info) => info.getValue(),
      filterFn: 'includesString',
    },
    {
      accessorKey: 'career',
      header: 'Carrera',
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
  actionsConfigProposal = {
    detail: false,
    edit: false,
    delete: false,
  };

  constructor() {
    this.data.set([
      {
        id: '1',
        document: '0912345678',
        name: 'Maria Belen Benitez Caceres',
        career: 'Ingenieria de Software',
        faculty: 'Ciencias Matematicas y Fisicas',
      },
      {
        id: '2',
        document: '1201234567',
        name: 'Pedro Pablo Fernandez Perez',
        career: 'Ingenieria de Software',
        faculty: 'Ciencias Matematicas y Fisicas',
      },
      {
        id: '3',
        document: '1712345678',
        name: 'Natalia Maria Ibarra Alvarez',
        career: 'Ingenieria de Software',
        faculty: 'Ciencias Matematicas y Fisicas',
      },
    ]);

    this.dataProposal.set([
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

  onDetail(row: TMemberTable) {
    console.log('Detalle:', row);
    this.toggleDetailModal();
  }
}
