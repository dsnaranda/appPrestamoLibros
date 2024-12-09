import { HttpClient } from '@angular/common/http';
import { Libro } from '../Entidades/Libros'; 

export function cargarLibros(http: HttpClient): Promise<Libro[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/getLibros').subscribe(
            (data) => {
                // Mapea los datos recibidos a objetos de la clase Libro
                const libros = data.map(
                    (item) =>
                        new Libro(
                            item._id, 
                            item.codigo,      
                            item.categoria,   
                            item.editorial,   
                            item.nombre,      
                            item.autor,      
                            item.ano,         
                            item.tipo,        
                            item.estado      
                        )
                );
                resolve(libros);
            },
        );
    });
}

export function cargarCodigo(http: HttpClient): Promise<string[]> {
    return new Promise((resolve, reject) => {
        http.get<any[]>('http://localhost:3000/api/getLibrosDisponibles').subscribe(
            (data) => {
                // Extrae solo las cédulas de los estudiantes
                const codigos = data.map(item => item.codigo);
                resolve(codigos);
            },
        );
    });
}

export function eliminarLibro(http: HttpClient, id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        http.delete(`http://localhost:3000/api/deleteLibro/${id}`).subscribe(
            () => {
                console.log(`Libro con ID ${id} eliminado correctamente.`);
                resolve();
            },
        );
    });
}
