import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { PartidasComponent } from './partidas/partidas.component';
import { RecursosComponent } from './recursos/recursos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NoticiasUserComponent } from './noticias-user/noticias-user.component';
import { NoticiasAdminComponent } from './noticias-admin/noticias-admin.component';
import { CrearPersonajeComponent } from './crear-personaje/crear-personaje.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'crear-personaje', component: CrearPersonajeComponent },
  { path: 'partidas', component: PartidasComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'noticias-user', component: NoticiasUserComponent },
  { path: 'noticias-admin', component: NoticiasAdminComponent },
  { path: '**', redirectTo: '' }
];
