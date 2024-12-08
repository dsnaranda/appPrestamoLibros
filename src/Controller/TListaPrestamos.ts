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
                // Filtra los préstamos cuyo estado es false y extrae solo los códigos
                const codigos = data.filter(item => item.estado === false).map(item => item.codigo);
                resolve(codigos);
            },
            (error) => {
                console.error("Error al cargar los códigos de los préstamos:", error);
                reject(error);
            }
        );
    });
}

