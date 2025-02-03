import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ToastSwal } from '@/app/shared/Swal';
import { AuthService } from '@/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private FormBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.FormBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(13),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  showToast(
    message: string,
    icon: 'warning' | 'error' | 'success' | 'info' | 'question'
  ) {
    const { ToastError } = ToastSwal();

    ToastError({
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      icon: icon,
      title: message,
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFieldBlur(fieldName: string) {
    const field = this.loginForm.get(fieldName);

    if (field?.invalid && field.touched) {
      if (field.errors?.['required']) {
        this.showToast(
          fieldName === 'username'
            ? 'El "Usuario" es requerido.'
            : 'La "Contraseña" es requerida.',
          'error'
        );
      } else if (field.errors?.['minlength']) {
        this.showToast(
          fieldName === 'username'
            ? 'El "Usuario" debe tener al menos 10 caracteres.'
            : 'La "Contraseña" debe tener al menos 8 caracteres.',
          'error'
        );
      } else if (field.errors?.['maxlength'] && fieldName === 'username') {
        this.showToast(
          'El "Usuario" debe tener como máximo 13 caracteres.',
          'error'
        );
      }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: response?.message || 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 2000,
          });
          this.router.navigate(['/dashboard']);
          sessionStorage.setItem('token', response.token ?? '');
          localStorage.setItem('profile', JSON.stringify(response.data));
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: err.error?.message || 'Ha ocurrido un error inesperado.',
          });
        },
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((fieldName) => {
        const field = this.loginForm.get(fieldName);
        if (field?.invalid) {
          if (field.errors?.['required']) {
            this.showToast(
              fieldName === 'username'
                ? 'El "Usuario" es requerido.'
                : 'La "Contraseña" es requerida.',
              'error'
            );
          } else if (field.errors?.['minlength']) {
            this.showToast(
              fieldName === 'username'
                ? 'El "Usuario" debe tener al menos 10 caracteres.'
                : 'La "Contraseña" debe tener al menos 8 caracteres.',
              'error'
            );
          } else if (field.errors?.['maxlength'] && fieldName === 'username') {
            this.showToast(
              'El "Usuario" debe tener como máximo 13 caracteres.',
              'error'
            );
          }
        }
      });
    }
  }
}
