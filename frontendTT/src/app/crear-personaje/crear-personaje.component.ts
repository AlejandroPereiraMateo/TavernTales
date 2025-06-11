import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../services/personajes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-personaje',
  templateUrl: './crear-personaje.component.html',
  styleUrls: ['./crear-personaje.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class CrearPersonajeComponent implements OnInit {
  personaje: any = {
    nombre: '',
    atributos: '',
    user_id: ''
  };

  clase = '';
  raza = '';
  nivel = 1;
  imagenBase64: string = '';

  constructor(
    private personajeService: PersonajesService,
    private authService: AuthService
  ) {}

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

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (userData: any) => {
        this.personaje.user_id = userData.id;
      },
      error: (err) => {
        console.error('Error al obtener usuario', err);
      }
    });
  }

  guardarPersonaje() {
    this.personaje.atributos = JSON.stringify({
      clase: this.clase,
      raza: this.raza,
      nivel: this.nivel
    });
    this.personaje.imagen = this.imagenBase64;
    console.log('Personaje a enviar:', this.personaje);


    this.personajeService.crearPersonaje(this.personaje).subscribe({
      next: (response: any) => {
        console.log('Personaje creado:', response);
        Swal.fire({
          icon: 'success',
          title: '¡Personaje creado!',
          text: 'Tu personaje se ha guardado correctamente.',
          confirmButtonColor: '#3085d6'
        });
      },
      error: (err: any) => {
        console.error('Error al crear personaje:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el personaje.',
          confirmButtonColor: '#d33'
        });
      }
    });
    
  }
}