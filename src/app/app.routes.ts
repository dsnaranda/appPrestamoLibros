import { Routes } from '@angular/router';
import { EstudiantesComponent } from './formularios/formEstudiantes/estudiantes.component';
import { NavbarComponent } from './formularios/navbar/navbar.component';
import { LibrosComponent } from './formularios/formLibros/libros.component';
import { PrestamosComponent } from './formularios/formPrestamos/prestamos.component';
import { DevolucionesComponent } from './formularios/formDevoluciones/devoluciones.component';

export const routes: Routes = [
    {path: 'nav', component: NavbarComponent,
         children: [
            { path: 'estudiante', component: EstudiantesComponent },
            { path: 'libros', component: LibrosComponent },
            { path: 'prestamos', component: PrestamosComponent },
            { path: 'devoluciones', component: DevolucionesComponent },
        ],
    },
    { path: '**', redirectTo: 'nav/estudiante' }

];
