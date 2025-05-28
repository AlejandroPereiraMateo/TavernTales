import { Component, OnInit } from '@angular/core';
import  { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticiaService, Noticia } from '../services/noticia.service';

@Component({
  selector: 'app-noticias-admin',
  templateUrl: './noticias-admin.component.html',
  styleUrls: ['./noticias-admin.component.css'],
  imports:[
    CommonModule,
    ReactiveFormsModule
  ]
})
export class NoticiasAdminComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaForm: FormGroup;

  constructor(
    private noticiaService: NoticiaService,
    private fb: FormBuilder
  ) {
    this.noticiaForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.noticiaService.obtenerNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  crearNoticia() {
    if (this.noticiaForm.invalid) return;

    this.noticiaService.crearNoticia(this.noticiaForm.value).subscribe(() => {
      this.cargarNoticias();
      this.noticiaForm.reset();
    });
  }

  eliminarNoticia(id: number) {
    this.noticiaService.eliminarNoticia(id).subscribe(() => {
      this.cargarNoticias();
    });
  }
}