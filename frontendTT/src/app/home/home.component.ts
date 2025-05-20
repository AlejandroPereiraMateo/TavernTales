import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}
  user: any;
  error: string | null = null;

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => {
        this.error = 'Error al encontrar datos del usuario';
        console.error(err);
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
