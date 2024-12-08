import { Devolucion } from '../Entidades/Devoluciones';
import { HttpClient } from '@angular/common/http';

export function agregarDevolucion(http: HttpClient, formData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    http.post('http://localhost:3000/api/addDevoluciones', formData)
      .subscribe(
        (response) => {
          console.log('Devolución agregada:', response);
          resolve(response);
        },
        (error) => {
          console.error('Error al agregar la devolución', error);
          reject(error);
        }
      );
  });
}

export function cargarDevoluciones(http: HttpClient): Promise<Devolucion[]> {
  return new Promise((resolve, reject) => {
    http.get<any[]>('http://localhost:3000/api/getDevoluciones').subscribe(
      (data) => {
        const devoluciones = data.map(
          (item) =>
            new Devolucion(
              item.codigo,
              item.codPrestamo,
              new Date(item.fDevolucion)
            )
        );
        resolve(devoluciones);
      },
      (error) => {
        console.error("Error al cargar las devoluciones:", error);
        reject(error);
      }
    );
  });
}


