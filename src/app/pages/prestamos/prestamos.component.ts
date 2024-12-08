import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Prestamo } from '../../../Entidades/Prestamos';
import { cargarPrestamos } from '../../../Controller/TListaPrestamos';
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
        this.cedulas = data;  // Asigna las cédulas obtenidas a la propiedad 'cedulas'
        console.log("Cedulas cargadas:", this.cedulas);  // Muestra las cédulas en consola para verificar
      })
      .catch((error) => {
        console.error("Error al cargar las cédulas:", error);  // Manejo de errores
    });

    cargarCodigo(this.http)
      .then((data) => {
        this.codigos = data;  // Asigna las cédulas obtenidas a la propiedad 'cedulas'
        console.log("Codigos cargadas:", this.codigos);  // Muestra las cédulas en consola para verificar
      })
      .catch((error) => {
        console.error("Error al cargar los codigos:", error);  // Manejo de errores
    });
  }

  addToList(): void {
    if (this.prestamoForm.valid) {
      this.prestamosList.push(this.prestamoForm.value); // Añade el préstamo a la lista
    } else {
      alert('Por favor, completa los campos requeridos.');
    }
  }

  submitList(): void {
    if (this.prestamosList.length > 0) {
      this.http.post('http://localhost:3000/api/addPrestamos', this.prestamosList)
        .subscribe(response => {
          console.log('Préstamos enviados:', response);
          cargarPrestamos(this.http).then(
            (data) => {
              this.prestamos = data;
              console.log("Prestamos cargados:", this.prestamos);
            }
          );
          this.prestamosList = [];
        }, error => {
          console.error('Error al enviar préstamos:', error);
        });
    }
  }
}
