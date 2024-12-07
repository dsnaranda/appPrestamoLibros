import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../Entidades/Estudiante';


export function cargarEstudiantesTrue(http: HttpClient): Promise<Estudiante[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/usuariosvalidos').subscribe(
            (data) => {
                // Mapea los datos recibidos a objetos de la clase Estudiante
                const estudiantes = data.map(
                    (item) =>
                        new Estudiante(
                            item.cedula,
                            item.nombre,
                            item.apellido,
                            item.sexo,
                            new Date(item.fechaNacimiento),
                            item.estado
                        )
                );
                resolve(estudiantes);
            },
            (error) => {
                console.error("Error al cargar los estudiantes:", error);
                reject(error);
            }
        );
    });
}



export function cargarEstudiantesFalse(http: HttpClient): Promise<Estudiante[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/usuariosnovalidos').subscribe(
            (data) => {
                // Mapea los datos recibidos a objetos de la clase Estudiante
                const estudiantes = data.map(
                    (item) =>
                        new Estudiante(
                            item.cedula,
                            item.nombre,
                            item.apellido,
                            item.sexo,
                            new Date(item.fechaNacimiento),
                            item.estado
                        )
                );
                resolve(estudiantes);
            },
            (error) => {
                console.error("Error al cargar los estudiantes:", error);
                reject(error);
            }
        );
    });
}

export function agregarEstudiante(estudiante: Estudiante, http: HttpClient): Promise<Estudiante> {
    const apiUrl = 'http://localhost:3000/api/addEstudiantes';
  
    return http.post<Estudiante>(apiUrl, estudiante)
      .toPromise()
      .then(response => {
        if (!response) {
          throw new Error('No se recibió estudiante desde el servidor');
        }
        return response;
      });
  }