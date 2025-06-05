import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { PersonajesService } from '../services/personajes.service';

@Component({
  standalone: true,
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
  imports: [CommonModule, RouterModule, NavbarComponent] 
})

export class PersonajesComponent implements OnInit {
  personajesFiltrados: any[] = [];
  user: any;
  error: string = '';
  constructor(
    private personajesService: PersonajesService,
    private authService: AuthService
  ) {}

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    this.personajesService.getPersonajesPorCreador().subscribe({
      next: (personajes: any[]) => { 
        this.personajesFiltrados = personajes.map((p: any) => ({
          ...p,
          atributos: typeof p.atributos === 'string' ? JSON.parse(p.atributos) : p.atributos
        }));
      },
      error: (err) => {
        console.error('Error al cargar personajes:', err);
        this.error = 'Error al cargar personajes. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }
}
