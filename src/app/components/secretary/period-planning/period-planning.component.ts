import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

export interface PeriodElement {
  id: string;
  period: string;
  description: string;
  status: string;
}

const PERIOD_DATA: PeriodElement[] = [
  {
    id: '1',
    period: '2023-2024',
    description: 'Periodo 2023-2024',
    status: 'Inactivo',
  },
  {
    id: '2',
    period: '2024-2025',
    description: 'Periodo 2024-2025',
    status: 'Activo',
  },
];

@Component({
  selector: 'app-period-planning',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './period-planning.component.html',
  styleUrl: './period-planning.component.css',
})
export class PeriodPlanningComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'period', 'description', 'status'];
  dataSource = new MatTableDataSource<PeriodElement>(PERIOD_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
