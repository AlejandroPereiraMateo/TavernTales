import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';


interface Noticias {
  id?: number;
  titulo: string;
  contenido: string;
  fecha?: string;
}

import { NoticiasUserComponent } from '../noticias-user/noticias-user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, NoticiasUserComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  error: string | null = null;
  noticias: Noticias[] = [];
  nuevaNoticia: Noticias = { titulo: '', contenido: '' };

  constructor(
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
  }

  logout() {
    this.router.navigate(['/login']);
  }
}