import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Prestamo } from '../../../Entidades/Prestamos';
import { cargarPrestamos, enviarPrestamos } from '../../../Controller/TListaPrestamos';
import { cargarCedulasEstudiantes } from '../../../Controller/TListaEstudiantes';
import { cargarCodigo } from '../../../Controller/TListaLibros';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [HttpClientModule, NgIf, NgFor, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent {
  prestamos: Prestamo[] = [];
  cedulas: string[] = [];
  codigos: string[] = [];
  prestamosList: any[] = [];
  prestamoForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    const hoy = new Date();
    const fechaActual = `${hoy.getFullYear()}-${(hoy.getMonth() + 1).toString().padStart(2, '0')}-${hoy.getDate().toString().padStart(2, '0')}`;

    this.prestamoForm = this.fb.group({
      codigo: ['', Validators.required],
      cedula: ['', Validators.required],
      codlib: ['', Validators.required],
      fPrestamo: [fechaActual, Validators.required],
      fLimite: ['', Validators.required],
      estado: false
    });
  }

  ngOnInit(): void {
    cargarPrestamos(this.http).then(
      (data) => {
        this.prestamos = data;
        console.log("Prestamos cargados:", this.prestamos);
      }
    );

    cargarCedulasEstudiantes(this.http)
      .then((data) => {
        this.cedulas = data;  
      })

    cargarCodigo(this.http)
      .then((data) => {
        this.codigos = data;  
      })

  }

  addToList(): void {
    if (this.prestamoForm.valid) {
      const prestamo = { ...this.prestamoForm.value };
  
      if (prestamo.fLimite) {
        const fechaLimite = new Date(prestamo.fLimite);
        fechaLimite.setDate(fechaLimite.getDate() + 1);
        prestamo.fLimite = fechaLimite.toISOString().split('T')[0];
      }

      if (prestamo.fPrestamo) {
        const fechaPrestamo = new Date(prestamo.fPrestamo);
        fechaPrestamo.setDate(fechaPrestamo.getDate() + 1);
        prestamo.fPrestamo = fechaPrestamo.toISOString().split('T')[0];
      }
  
      this.prestamosList.push(prestamo); 
    } else {
      alert('Por favor, completa los campos requeridos.');
    }
  }
  
  submitList(): void {
    if (this.prestamosList.length > 0) {
      enviarPrestamos(this.http, this.prestamosList)
        .then((response) => {
          cargarPrestamos(this.http)
            .then((data) => {
              this.prestamos = data;
            })
            .catch((error) => {
              console.error("Error al cargar los préstamos:", error);
            });
          this.prestamosList = [];
        })
    }
  }
}