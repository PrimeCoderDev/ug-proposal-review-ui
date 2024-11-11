import { Component, Output, EventEmitter } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface OptionNode {
  name: string;
  children?: OptionNode[];
  url?: string;
  classIcon?: string;
}

const TREE_DATA: OptionNode[] = [
  {
    name: 'SECRETARIA',
    children: [
      {
        name: 'Planificacion de periodo',
        url: '/secretary/period-planning',
        classIcon: 'ti ti-report',
      },
      {
        name: 'Carga de propuestas',
        url: '/secretary/load-proposal',
        classIcon: 'ti ti-file-upload',
      },
    ],
  },
  {
    name: 'GESTOR',
    children: [
      {
        name: 'Comision de revisores',
        url: '/management/review-comision',
        classIcon: 'ti ti-users-group',
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  dataSource = TREE_DATA;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  childrenAccessor = (node: OptionNode) => node.children ?? [];

  hasChild = (_: number, node: OptionNode) =>
    !!node.children && node.children.length > 0;
}
