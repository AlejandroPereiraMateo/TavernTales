import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  error: string | null = null;

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

  saveProfile(): void {
    this.authService.updateProfile(this.user).subscribe({
      next: () => {
        this.error = null;
      },
      error: () => {
        this.error = 'Error al guardar el perfil';
      }
    });
  }
}
