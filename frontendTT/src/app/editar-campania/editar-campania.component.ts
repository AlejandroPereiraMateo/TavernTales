import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaniasService } from '../services/campanias.service';
import { AuthService } from '../auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-campania',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './editar-campania.component.html',
  styleUrls: ['./editar-campania.component.css']
})
export class EditarCampaniaComponent implements OnInit {
  nombre = '';
  descripcion = '';
  master_id = '';
  userEmails: string[] = [];
  newUserEmail: string = '';
  campaniaId: number | null = null;

  constructor(
    private campaniasService: CampaniasService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (userData) => {
        this.master_id = userData.id;
        this.route.paramMap.subscribe(params => {
          const idParam = params.get('id');
          if (idParam) {
            this.campaniaId = +idParam;
            this.loadCampania(this.campaniaId);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  loadCampania(id: number): void {
    this.campaniasService.getCampanias().subscribe({
      next: (campanias) => {
        const campania = campanias.find((c: any) => c.id_campania === id);
        if (campania) {
          this.nombre = campania.nombre;
          this.descripcion = campania.descripcion;
          this.userEmails = campania.usuarios_invitados || [];
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Campaña no encontrada',
            confirmButtonColor: '#d33'
          });
          this.router.navigate(['/campanias']);
        }
      },
      error: (err) => {
        console.error('Error al cargar campaña:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar la campaña.',
          confirmButtonColor: '#d33'
        });
        this.router.navigate(['/campanias']);
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

  actualizarCampania(): void {
    if (!this.nombre || !this.descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos obligatorios.',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (this.campaniaId === null) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de campaña inválido.',
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
  }
}
