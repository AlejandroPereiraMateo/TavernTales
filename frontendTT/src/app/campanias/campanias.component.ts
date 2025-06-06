import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { CampaniasService } from '../services/campanias.service';

@Component({
  selector: 'app-partidas',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule, NgFor, NgIf],
  templateUrl: './campanias.component.html',
  styleUrls: ['./campanias.component.css']
})
export class CampaniasComponent implements OnInit {
  user: any;
  campaniasUsuario: any[] = [];
  http: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private campaniasService: CampaniasService
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log('User role:', this.user?.rol);
        this.loadCampanias();
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }

  loadCampanias(): void {
    this.campaniasService.getCampanias().subscribe({
      next: (campanias) => {
        console.log('Campañas recibidas:', campanias);
        this.campaniasUsuario = campanias;
      },
      error: (err) => {
        console.error('Error al cargar campañas:', err);
      }
    });
  }

  irACrearCampania() {
    this.router.navigate(['/crear-campania']);
  }
}
