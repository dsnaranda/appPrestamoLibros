import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Estudiante } from '../../../Entidades/Estudiante';
import { cargarEstudiantesFalse, cargarEstudiantesTrue } from '../../../Controller/TListaEstudiantes';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule



@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [HttpClientModule,NgIf, NgFor ,FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
  estudiantestrue: Estudiante[] = [];
  estudiantesfalse: Estudiante[] = [];
  estudiantesForm: FormGroup;


  constructor( private fb: FormBuilder, private http: HttpClient) { 
      this.estudiantesForm = this.fb.group({
        cedula: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Validación de cédula
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        sexo: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        estado: true,
      });
  }

  ngOnInit(): void {
    cargarEstudiantesTrue(this.http).then(
      (data) => {
        this.estudiantestrue = data;
        console.log("Estudiantes cargados:", this.estudiantestrue); 
      }
    );

    cargarEstudiantesFalse(this.http).then(
      (data) => {
        this.estudiantesfalse = data;
        console.log("Estudiantes cargados:", this.estudiantesfalse); 
      }
    );
  }


  // Función para enviar los datos del formulario
  onSubmit(): void {
    if (this.estudiantesForm.valid) {
      this.http.post('http://localhost:3000/api/addEstudiantes', this.estudiantesForm.value)
        .subscribe(response => {
          console.log('Estudiante agregado', response);
          cargarEstudiantesTrue(this.http).then(
            (data) => {
              this.estudiantestrue = data;
              console.log("Estudiantes cargados:", this.estudiantestrue); 
            }
          );
        }, error => {
          console.error('Error al agregar estudiante', error);
        });
    }
  }

}
