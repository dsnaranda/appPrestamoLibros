import { Routes } from '@angular/router';
import { EstudiantesComponent } from './pages/formEstudiantes/estudiantes.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LibrosComponent } from './pages/formLibros/libros.component';
import { PrestamosComponent } from './pages/formPrestamos/prestamos.component';
import { DevolucionesComponent } from './pages/formDevoluciones/devoluciones.component';

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
