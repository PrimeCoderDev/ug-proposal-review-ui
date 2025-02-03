import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '@/app/services/menu.service';

interface OptionNode {
  name: string;
  children?: OptionNode[];
  path?: string;
  icon?: string;
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
      icon: 'ti ti-home',
      path: '/dashboard',
    },
  ];

  collapsed = true;
  isDarkMode = false;

  constructor(private renderer: Renderer2, private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getMenus().subscribe({
      next: (menus) => {
        this.menuOptions = [...this.menuOptions, ...menus.data];
      },
      error: (err) => {
        console.error('Error al cargar los menús:', err);
      },
    });
  }

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
