import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';  // Necesario para realizar solicitudes HTTP
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,  // Tu componente principal
    // Otros componentes que necesites
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Asegúrate de agregar esto para que puedas hacer peticiones HTTP
    RouterModule.forRoot(routes)  // Importa las rutas para habilitar el enrutamiento
  ],
  providers: [],
  bootstrap: [AppComponent]  // Define el componente principal que se carga primero
})
export class AppModule { }
