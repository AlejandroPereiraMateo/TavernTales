import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// Necesario para realizar solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // Importar rutas
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  //Para decidir el componente que se cargará primero
  bootstrap: [AppComponent]  
})
export class AppModule { }
