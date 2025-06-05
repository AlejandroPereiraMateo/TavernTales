import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoticiasUserComponent } from './noticias-user/noticias-user.component';
import { NoticiasAdminComponent } from './noticias-admin/noticias-admin.component';

import { PerfilComponent } from './perfil/perfil.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


import { CrearPersonajeComponent } from './crear-personaje/crear-personaje.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    NoticiasUserComponent,
    NoticiasAdminComponent,
    CrearPersonajeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]  
})
export class AppModule { }
