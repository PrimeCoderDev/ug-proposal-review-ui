import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OptionNode {
  name: string;
  children?: OptionNode[];
  url?: string;
  classIcon?: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuOptions: OptionNode[] = [
    {
      name: 'INICIO',
      expanded: false,
      classIcon: 'ti ti-home',
      url: '/dashboard',
    },
    {
      name: 'SECRETARIA',
      expanded: false,
      classIcon: 'ti ti-user',
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
      expanded: false,
      classIcon: 'ti ti-user-bolt',
      children: [
        {
          name: 'Comision de revisores',
          url: '/management/commission-reviewers',
          classIcon: 'ti ti-users-group',
        },
      ],
    },
    {
      name: 'COORDINADOR',
      expanded: false,
      classIcon: 'ti ti-user-share',
      children: [
        {
          name: 'Asignacion Propuestas',
          url: '/coordination/assignment-proposals',
          classIcon: 'ti ti-clipboard-text',
        },
      ],
    },
    {
      name: 'REVISOR',
      expanded: false,
      classIcon: 'ti ti-zoom-check',
      children: [
        {
          name: 'Revision Propuestas',
          url: '/reviewer/review-proposals',
          classIcon: 'ti ti-clipboard-search',
        },
      ],
    },
    {
      name: 'ALUMNO',
      expanded: false,
      classIcon: 'ti ti-school',
      children: [
        {
          name: 'Corregir Propuesta',
          url: '/student/correction-proposal',
          classIcon: 'ti ti-file-pencil',
        },
      ],
    },
  ];

  collapsed = true;
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    if (this.collapsed) {
      this.menuOptions.forEach((option) => {
        if (option.children) {
          option.expanded = false;
        }
      });
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
    } else {
      this.renderer.addClass(document.body, 'light');
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  toggleSubmenu(option: OptionNode): void {
    if (option.children) {
      option.expanded = !option.expanded;
      if (option.expanded) {
        this.collapsed = false;
      }
    }
  }
}
