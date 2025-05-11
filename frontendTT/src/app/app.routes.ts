import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { PartidasComponent } from './partidas/partidas.component';
import { RecursosComponent } from './recursos/recursos.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'partidas', component: PartidasComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: '**', redirectTo: '' }
];
