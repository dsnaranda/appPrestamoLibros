import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Libro } from '../../../Entidades/Libros';
import { cargarLibros, eliminarLibro } from '../../../Controller/TListaLibros';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  librosForm: FormGroup;
  categorias: string[] = ['Literatura', 'Salud', 'Informática', 'Erótico'];
  tipos: string[] = ['Libro', 'Revista'];
  idEditar: string | null = null; // Variable para almacenar el ID del libro a editar


  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Creación del formulario con validaciones
    this.librosForm = this.fb.group({
      codigo: ['', Validators.required],
      categoria: ['', Validators.required],
      editorial: ['', Validators.required],
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      ano: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
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
  }

  editarLibro(id: string): void {
    const libro = this.libros.find(libro => libro._id === id);
    if (libro) {
      this.idEditar = id;
      this.librosForm.setValue({
        codigo: libro.codigo,
        categoria: libro.categoria,
        editorial: libro.editorial,
        nombre: libro.nombre,
        autor: libro.autor,
        ano: libro.ano,
        tipo: libro.tipo,
        estado: libro.estado
      });
    }
  }
  
  onSubmit(): void {
    if (this.librosForm.valid) {
      if (this.idEditar) {
        this.http.put(`http://localhost:3000/api/updateLibro/${this.idEditar}`, this.librosForm.value)
          .subscribe(
            (response) => {
              console.log('Libro actualizado', response);
              cargarLibros(this.http).then((data) => {
                this.libros = data;
                console.log('Libros cargados:', this.libros);
              });
              this.librosForm.reset({
                estado: true
              });
            }
          );
      } else {
        this.http.post('http://localhost:3000/api/addLibro', this.librosForm.value)
          .subscribe(
            (response) => {
              console.log('Libro agregado', response);
              cargarLibros(this.http).then((data) => {
                this.libros = data;
                console.log('Libros cargados:', this.libros);
              });
              this.librosForm.reset({
                estado: true
              });
            }
          );
      }
    } else {
      console.error('Formulario inválido');
    }
  }

  modificarLibro(id: string): void {
    const libroAEditar = this.libros.find(libro => libro._id === id);

    if (libroAEditar) {
      this.librosForm.patchValue({
        codigo: libroAEditar.codigo,
        categoria: libroAEditar.categoria,
        editorial: libroAEditar.editorial,
        nombre: libroAEditar.nombre,
        autor: libroAEditar.autor,
        ano: libroAEditar.ano,
        tipo: libroAEditar.tipo,
        estado: libroAEditar.estado
      });

      this.idEditar = libroAEditar._id;  // Guardamos el ID para el submit
    }
  }


  crearNuevoLibro(): void {
    this.idEditar = null;
    this.librosForm.reset({
      estado: true
    });
  }

}
