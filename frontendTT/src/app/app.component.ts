import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    this.mensaje = 'Bienvenido a Tavern Tales';
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
