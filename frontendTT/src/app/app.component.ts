import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TavernTales';
  mensaje = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ mensaje: string }>('http://localhost:8000/api/saludo')
      .subscribe({
        next: (res) => {
          this.mensaje = res.mensaje;
        },
        error: (err) => {
          console.error('Error conectando con Laravel:', err);
        }
      });
  }

  logout(): void {
     // Implementa la lógica de cierre de sesión aquí, como limpiar los tokens de autenticación, redirigir a la página de login
    console.log('Logout clicked');
  }
}
