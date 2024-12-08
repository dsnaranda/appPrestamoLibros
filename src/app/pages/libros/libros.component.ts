import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libro } from '../../../Entidades/Libros';
import { cargarLibros, eliminarLibro } from '../../../Controller/TListaLibros';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf ,FormsModule, ReactiveFormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  librosForm: FormGroup; 
  categorias: string[] = ['Literatura', 'Salud', 'Informática', 'Erótico'];
  tipos: string[] = ['Libro', 'Revista'];

  constructor( private fb: FormBuilder, private http: HttpClient) { 
     // Creación del formulario con validaciones
     this.librosForm = this.fb.group({
      codigo: ['', Validators.required],
      categoria: ['', Validators.required],
      editorial: ['', Validators.required],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      ano: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]], // Validación de año
      tipo: ['', Validators.required],
      estado: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    cargarLibros(this.http).then(
      (data) => {
        this.libros = data;
        console.log("Estudiantes cargados:", this.libros); 
      }
    );
   
  }

  eliminarLibro(id: string): void {
    eliminarLibro(this.http, id)
      .then(() => {
        console.log("Libro eliminado. Actualizando lista...");
        cargarLibros(this.http).then(
          (data) => {
            this.libros = data;
            console.log("Estudiantes cargados:", this.libros); 
          }
        );
      })
      .catch((error) => {
        console.error("Error al intentar eliminar el libro:", error);
      });
  }

  // Función para enviar los datos del formulario
  onSubmit(): void {
    if (this.librosForm.valid) {
      this.http.post('http://localhost:3000/api/addLibro', this.librosForm.value)
        .subscribe(response => {
          console.log('Libro agregado', response);
          cargarLibros(this.http).then(
            (data) => {
              this.libros = data;
              console.log("Estudiantes cargados:", this.libros); 
            }
          );        }, error => {
          console.error('Error al agregar libro', error);
        });
    } else {
      console.error('Formulario inválido');
    }
  }

  // Método para modificar un libro
  modificarLibro(id: string): void {
    console.log('Modificar libro:', id);
    // Aquí puedes abrir un formulario modal o redirigir al usuario a una página de edición
  }

}
