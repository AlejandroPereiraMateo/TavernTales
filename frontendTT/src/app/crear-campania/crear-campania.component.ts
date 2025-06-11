import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CampaniasService } from '../services/campanias.service';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-campania',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './crear-campania.component.html',
  styleUrls: ['./crear-campania.component.css']
})
export class CrearCampaniaComponent implements OnInit {
  nombre = '';
  descripcion = '';
  master_id = '';
  userEmails: string[] = [];
  newUserEmail: string = '';
  isEditMode = false;
  campaniaId: number | null = null;

  constructor(
    private campaniasService: CampaniasService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (userData) => {
        this.master_id = userData.id;
        // Check if editing existing campaign
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as { campania?: any };
        if (state?.campania) {
          this.isEditMode = true;
          this.campaniaId = state.campania.id_campania;
          this.nombre = state.campania.nombre;
          this.descripcion = state.campania.descripcion;
          this.userEmails = state.campania.usuarios_invitados || [];
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  addUserEmail(): void {
    if (this.newUserEmail && this.newUserEmail.includes('@') && !this.userEmails.includes(this.newUserEmail)) {
      this.userEmails.push(this.newUserEmail);
      this.newUserEmail = '';
    }
  }

  removeUserEmail(email: string): void {
    this.userEmails = this.userEmails.filter(e => e !== email);
  }

  crearCampania(): void {
    if (!this.nombre || !this.descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos obligatorios.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const campaniaData = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      master_id: this.master_id,
      fecha_creacion: new Date().toISOString(),
      usuariosInvitados: this.userEmails
    };

    if (this.isEditMode && this.campaniaId) {
      this.campaniasService.actualizarCampania(this.campaniaId, campaniaData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Campaña actualizada',
            text: 'La campaña se ha actualizado correctamente.',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/campanias']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar campaña:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar la campaña.',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      this.campaniasService.crearCampania(campaniaData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Campaña creada',
            text: 'La campaña se ha creado correctamente.',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/campanias']);
          });
        },
        error: (err) => {
          console.error('Error al crear campaña:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear la campaña.',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  }
}
