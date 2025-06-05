import { Component, OnInit } from '@angular/core';
import { NoticiaService, Noticia } from '../services/noticia.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-noticias-user',
  templateUrl: './noticias-user.component.html',
  styleUrls: ['./noticias-user.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NoticiasUserComponent implements OnInit {
  noticias: Noticia[] = [];
  user: any;
  error: string | null = null;

  constructor(
    private noticiaService: NoticiaService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => {
        this.error = 'Error al encontrar datos del usuario';
        console.error(err);
      }
    });
    this.noticiaService.obtenerNoticias().subscribe(data => {
      console.log('Noticias received:', data);
      this.noticias = data;
    }, error => {
      console.error('Error fetching noticias:', error);
    });
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#412042',
      cancelButtonColor: '#a9874e',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminando noticia con id:', id);
        this.noticiaService.eliminarNoticia(id).subscribe({
          next: () => {
            this.noticias = this.noticias.filter(n => n.id !== id);
            Swal.fire('Eliminado', 'La noticia fue eliminada correctamente.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar noticia:', err);
            Swal.fire('Error', 'No se pudo eliminar la noticia.', 'error');
          }
        });
      }
    });
  }
}
