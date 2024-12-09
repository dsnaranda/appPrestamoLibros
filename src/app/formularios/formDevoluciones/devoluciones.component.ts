import { NgFor, NgIf, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Devoluciones } from '../../../Entidades/Devoluciones';
import { cargarCodigosPrestamo } from '../../../Controller/TListaPrestamos';
import { agregarDevolucion, cargarDevoluciones } from '../../../Controller/TListaDevoluciones';

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css'
})
export class DevolucionesComponent implements OnInit {
  devoluciones: Devoluciones[] = [];
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

    //Cargar los prestamos
    cargarCodigosPrestamo(this.http)
      .then((data) => {
        this.codigos = data;  
    })

    // Cargar las devoluciones
    cargarDevoluciones(this.http)
      .then((data) => {
        this.devoluciones = data; 
    })

  }

  onSubmit(): void {
    if (this.devolucionesForm.valid) {
      const formData = { ...this.devolucionesForm.value };
      const fechaOriginal = new Date(formData.fDevolucion);
      fechaOriginal.setDate(fechaOriginal.getDate() + 1);
      formData.fDevolucion = fechaOriginal.toISOString().split('T')[0];

      agregarDevolucion(this.http, formData)
        .then((response) => {
          cargarDevoluciones(this.http)
            .then((data) => {
              this.devoluciones = data;
            })
          this.devolucionesForm.reset({
            estado: true
          });
        })
        .catch((error) => {
          console.error('Error al agregar la devolución', error);
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}