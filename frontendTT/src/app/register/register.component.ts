import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  passwordConfirm = '';
  rol = 'jugador';
  imagenBase64: string = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onImageSelected(event: any) {
    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imagenBase64 = reader.result as string;
      console.log('Imagen en base64:', this.imagenBase64);
    };

    reader.onerror = error => {
      console.error('Error al convertir imagen a base64', error);
    };
  }

  onSubmit(): void {
    if (this.password !== this.passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.passwordConfirm);
    formData.append('rol', this.rol);

    this.authService.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: '¡Registro exitoso! Redirigiendo a la página de inicio...',
          confirmButtonColor: '#3085d6'
        });
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        console.error('Error response from backend:', err);
        let errorMsg = 'Error en el registro. Por favor, inténtalo de nuevo.';
        if (err.error && err.error.errors) {
          const errors = err.error.errors;
          errorMsg = Object.values(errors).flat().join(' ');
          if (errorMsg.includes('The email has already been taken')) {
            errorMsg = 'El correo electrónico ya está registrado.';
          }
        } else if (err.error && err.error.message) {
          errorMsg = err.error.message;
          if (errorMsg.includes('The email has already been taken')) {
            errorMsg = 'El correo electrónico ya está registrado.';
          }
        } else if (err.message) {
          errorMsg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#d33'
        });
      }
    });
  }
}
