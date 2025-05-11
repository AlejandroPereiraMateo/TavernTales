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
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.passwordConfirm) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    this.authService.register(this.name, this.email, this.password).subscribe({
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
