import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  message = `Hola 👋 ${
    JSON.parse(localStorage.getItem('profile') ?? '{}')?.name ?? ''
  }, Bienvenido/a de nuevo!`;
}
