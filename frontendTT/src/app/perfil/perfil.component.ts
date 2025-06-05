import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule, NavbarComponent] 
})
export class PerfilComponent implements OnInit {
  user: any;
  error: string | null = null;
  selectedImageFile: File | null = null;

  private backendUrl = 'http://localhost:8000/storage/profile_photos/';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  
  loadUser(): void {
    this.authService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Error al cargar el perfil';
      }
    });
  }

  getImageUrl(): string | null {
  if (!this.user || !this.user.imagen) {
    return null;
  }
  if (this.user.imagen.startsWith('data:image')) {
    return this.user.imagen;
  }
  return this.backendUrl + this.user.imagen;
}

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Solo para vista previa, no se envía al servidor
      this.user.previewImage = reader.result as string;
    };

    reader.onerror = error => {
      console.error('Error al leer imagen:', error);
    };
  }


  saveProfile() {
    const payload: any = {
      name: this.user.name,
      email: this.user.email,
    };

    // Enviar la imagen base64 si hay previewImage disponible
    if (this.user.previewImage) {
      payload.imagen = this.user.previewImage;  // Cadena base64 completa, ej: "data:image/jpeg;base64,..."
    }

    this.authService.updateProfile(payload).subscribe({
      next: () => {
        this.error = null;
        Swal.fire({
          icon: 'success',
          title: 'Perfil guardado',
          text: 'Tu perfil se ha guardado correctamente.',
          confirmButtonColor: '#3085d6'
        }).then(() => {
        window.location.reload();
      });
      },
      error: (err) => {
        this.error = 'Error al guardar el perfil';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el perfil.',
          confirmButtonColor: '#d33'
        });
        console.error('Error al guardar perfil:', err);
      }
    });
  }
}
