import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

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
  errorMessage = '';
  successMessage = '';
  // selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  // onFileSelected(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //   }
  // }

  onSubmit(): void {
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.passwordConfirm);
    formData.append('rol', this.rol);
    // if (this.selectedFile) {
    //   formData.append('profile_photo', this.selectedFile);
    // }

    this.authService.register(formData).subscribe({
      next: () => {
        this.successMessage = '¡Registro exitoso! Redirigiendo a la página de inicio...';
        setTimeout(() => this.router.navigate(['/home']), 2000);
      },
      error: (err) => {
        console.error('Error response from backend:', err);
        if (err.error && err.error.errors) {
          const errors = err.error.errors;
          this.errorMessage = Object.values(errors).flat().join(' ');
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }
}
