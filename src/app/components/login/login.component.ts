import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

import { ToastSwal } from '@/app/shared/Swal';

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

  constructor(private FormBuilder: FormBuilder, private router: Router) {
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
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        showConfirmButton: false,
        timer: 2000,
      });

      const formData = this.loginForm.value;
      console.log('Datos del formulario:', formData);
      this.router.navigate(['/dashboard']);
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
