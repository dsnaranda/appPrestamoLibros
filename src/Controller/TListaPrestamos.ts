import { HttpClient } from '@angular/common/http';
import { Prestamo } from '../Entidades/Prestamos';


export function cargarPrestamos(http: HttpClient): Promise<Prestamo[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/getPrestamos').subscribe(
            (data) => {
                // Mapea los datos recibidos a objetos de la clase Libro
                const prestamos = data.map(
                    (item) =>
                        new Prestamo(
                            item.codigo, 
                            item.cedula,      
                            item.codlib,   
                            new Date(item.fPrestamo),
                            new Date(item.fLimite),
                            item.estado                                 
                        )
                );
                resolve(prestamos);
            },
            (error) => {
                console.error("Error al cargar los libros:", error);
                reject(error);
            }
        );
    });
}


export function cargarCodigosPrestamo(http: HttpClient): Promise<string[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/getPrestamos').subscribe(
            (data) => {
                // Extrae solo las cédulas de los estudiantes
                const codigos = data.map(item => item.codigo);
                resolve(codigos);
            },
            (error) => {
                console.error("Error al cargar los codigos de los prestamos:", error);
                reject(error);
            }
        );
    });
}


