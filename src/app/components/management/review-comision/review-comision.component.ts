import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface ComisionData {
  id: string;
  description: string;
  period: string;
  status: string;
}

@Component({
  selector: 'app-review-comision',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './review-comision.component.html',
  styleUrl: './review-comision.component.css',
})
export class ReviewComisionComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'description', 'period', 'status'];
  dataSource: MatTableDataSource<ComisionData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const comisionData = Array.from({ length: 1 }, (_, k) => {
      return {
        id: '1',
        description: 'Comision revision 2024',
        period: '2024-2025',
        status: 'Activa',
      };
    });

    this.dataSource = new MatTableDataSource(comisionData);
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
