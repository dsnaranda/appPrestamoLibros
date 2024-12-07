import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Estudiante } from '../../../Entidades/Estudiante';
import { agregarEstudiante, cargarEstudiantesFalse, cargarEstudiantesTrue } from '../../../Controller/TListaEstudiantes';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [HttpClientModule, NgFor, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {
  estudiantestrue: Estudiante[] = [];
  estudiantesfalse: Estudiante[] = [];


  constructor(private http: HttpClient) { }

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

}
