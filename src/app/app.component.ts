import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ug-proposal-review-ui';
  showLayout = true;
  isSidebarOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.router.url === '/not-found') {
        this.showLayout = false;
      } else {
        this.showLayout = this.router.url !== '/';
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
