import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

interface Period {
  value: string;
  viewValue: string;
}

export interface PeriodData {
  documentId: string;
  name: string;
  option: string;
  caption: string; //rubro
  status: string;
  practicesValidated: string;
  linkageValidated: string;
}

@Component({
  selector: 'app-load-proposal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './load-proposal.component.html',
  styleUrl: './load-proposal.component.css',
})
export class LoadProposalComponent implements AfterViewInit {
  periods: Period[] = [
    { value: '2024-2025', viewValue: '2024-2025' },
    { value: '2023-2024', viewValue: '2023-2024' },
  ];

  displayedColumns: string[] = [
    'documentId',
    'name',
    'option',
    'caption',
    'status',
    'practicesValidated',
    'linkageValidated',
  ];
  dataSource: MatTableDataSource<PeriodData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const periodData = Array.from({ length: 1 }, (_, k) => {
      return {
        documentId: '12345',
        name: 'ABC',
        option: 'TRABAJO DE TITULACIÓN',
        caption: 'RUBRO 11',
        status: 'PENDIENTE',
        practicesValidated: '240',
        linkageValidated: '160',
      };
    });

    this.dataSource = new MatTableDataSource(periodData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
