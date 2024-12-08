import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../Entidades/Estudiante';

export function agregarEstudiante(http: HttpClient, estudiante: Estudiante): Promise<any> {
    return new Promise((resolve, reject) => {
        http.post('http://localhost:3000/api/addEstudiantes', estudiante).subscribe(
            (response) => {
                resolve(response);
            },
            (error) => {
                console.error('Error al agregar estudiante', error);
                reject(error);
            }
        );
    });
}

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

export function cargarCedulasEstudiantes(http: HttpClient): Promise<string[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/usuariosvalidos').subscribe(
            (data) => {
                // Extrae solo las cédulas de los estudiantes
                const cedulas = data.map(item => item.cedula);
                resolve(cedulas);
            },
            (error) => {
                console.error("Error al cargar las cédulas de los estudiantes:", error);
                reject(error);
            }
        );
    });
}

