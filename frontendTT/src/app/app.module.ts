import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
// Necesario para realizar solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    // Importar rutas
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  //Para decidir el componente que se cargará primero
  bootstrap: [AppComponent]  
})
export class AppModule { }
