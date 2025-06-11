// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { PersonajesService } from '../services/personajes.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-editar-personaje',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './editar-personaje.component.html',
//   styleUrls: ['./editar-personaje.component.css']
// })
// export class EditarPersonajeComponent implements OnInit {
//   personajeForm: FormGroup;
//   personajeId: string | null = null;
//   loading = false;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private personajesService: PersonajesService
//   ) {
//     this.personajeForm = this.fb.group({
//       nombre: ['', Validators.required],
//       atributos: this.fb.group({})
//     });
//   }

//   ngOnInit(): void {
//     this.personajeId = this.route.snapshot.paramMap.get('id');
//     if (this.personajeId) {
//       this.loadPersonaje(this.personajeId);
//     }
//   }

//   getKeys(obj: any): string[] {
//     return obj ? Object.keys(obj) : [];
//   }

//   loadPersonaje(id: string) {
//     this.personajesService.getPersonajeById(id).subscribe({
//       next: (data) => {
//         this.personajeForm.patchValue({
//           nombre: data.nombre
//         });
//         const atributos = typeof data.atributos === 'string' ? JSON.parse(data.atributos) : data.atributos;
//         const atributosGroup = this.personajeForm.get('atributos') as FormGroup;
//         Object.keys(atributos).forEach(key => {
//           atributosGroup.addControl(key, this.fb.control(atributos[key]));
//         });
//       },
//       error: (err) => {
//         Swal.fire('Error', 'Error loading character data.', 'error');
//       }
//     });
//   }

//   onSubmit() {
//     if (this.personajeForm.invalid || !this.personajeId) {
//       return;
//     }
//     this.loading = true;
//     const atributosGroup = this.personajeForm.get('atributos') as FormGroup;
//     const atributosValue = atributosGroup.value;
//     const updatedPersonaje = {
//       nombre: this.personajeForm.value.nombre,
//       atributos: JSON.stringify(atributosValue)
//     };
//     this.personajesService.actualizarPersonaje(Number(this.personajeId), updatedPersonaje).subscribe({
//       next: () => {
//         this.loading = false;
//         this.router.navigate(['/personajes']);
//       },
//       error: (err: any) => {
//         this.loading = false;
//         Swal.fire('Error', 'Error updating character.', 'error');
//       }
//     });
//   }
// }
