import { NgFor, NgIf, CommonModule  } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Devolucion } from '../../../Entidades/Devoluciones';
import { cargarCodigosPrestamo } from '../../../Controller/TListaPrestamos';
import { cargarDevoluciones } from '../../../Controller/TListaDevolver';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css'
})
export class DevolucionesComponent implements OnInit {
  devoluciones: Devolucion[] = [];
  codigos: string[] = [];
  devolucionesForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.devolucionesForm = this.fb.group({
      codigo: ['', Validators.required],
      codPrestamo: ['', Validators.required],
      fDevolucion: ['', Validators.required]
    });
  }

  ngOnInit(): void {


    cargarCodigosPrestamo(this.http)
      .then((data) => {
        this.codigos = data;  // Asigna las cédulas obtenidas a la propiedad 'cedulas'
        console.log("Codigos cargadas:", this.codigos);  // Muestra las cédulas en consola para verificar
      })
      .catch((error) => {
        console.error("Error al cargar los codigos:", error);  // Manejo de errores
      });

    // Cargar las devoluciones
    cargarDevoluciones(this.http)
      .then((data) => {
        this.devoluciones = data; // Asignar los datos a la propiedad devoluciones
        console.log("Devoluciones cargadas:", this.devoluciones);
      })
      .catch((error) => {
        console.error("Error al cargar las devoluciones:", error);
      });

  }

  onSubmit(): void {
    if (this.devolucionesForm.valid) {
      const formData = this.devolucionesForm.value;
  
      // Ajustar la fecha de devolución dentro del método
      const fechaOriginal = new Date(formData.fDevolucion);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      formData.fDevolucion = fechaOriginal.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
      // Enviar los datos del formulario al servidor
      this.http.post('http://localhost:3000/api/addDevoluciones', formData)
        .subscribe(
          (response) => {
            console.log('Devolución agregada', response);
  
            // Cargar las devoluciones nuevamente
            cargarDevoluciones(this.http)
              .then((data) => {
                this.devoluciones = data;
                console.log("Devoluciones cargadas:", this.devoluciones);
              })
              .catch((error) => {
                console.error("Error al cargar las devoluciones:", error);
              });
  
            // Reiniciar el formulario
            this.devolucionesForm.reset({
              estado: true
            });
          },
          (error) => {
            console.error('Error al agregar la devolución', error);
          }
        );
    } else {
      console.log('Formulario inválido');
    }
  }
  
}