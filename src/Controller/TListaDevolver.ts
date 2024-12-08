import { Devolucion } from '../Entidades/Devoluciones';
import { HttpClient } from '@angular/common/http';


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