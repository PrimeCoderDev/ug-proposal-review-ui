import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  FlexRenderDirective,
  getFilteredRowModel,
} from '@tanstack/angular-table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() set data(value: any[]) {
    this._data.set(value);
  }
  @Input() columns: ColumnDef<any>[] = [];
  @Input() actionsConfig: {
    edit?: boolean;
    delete?: boolean;
    detail?: boolean;
  } = {};
  @Input() tableWidth: string = 'w-3/4';
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onDetail = new EventEmitter<any>();

  rowsPerPage = signal<number>(10);

  private _data = signal<any[]>([]);

  table = createAngularTable(() => ({
    data: this._data(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  onFilterInput(event: Event, column: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && column) {
      column.setFilterValue(inputElement.value);
    }
  }

  setRowsPerPage(value: number) {
    this.rowsPerPage.set(value);
    this.table.setPageSize(value);
  }

  onRowsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const value = parseInt(selectElement.value, 10);
      if (!isNaN(value)) {
        this.setRowsPerPage(value);
      }
    }
  }
}
