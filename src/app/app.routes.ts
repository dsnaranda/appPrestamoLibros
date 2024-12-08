import { Routes } from '@angular/router';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LibrosComponent } from './pages/libros/libros.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { DevolucionesComponent } from './pages/devoluciones/devoluciones.component';

export const routes: Routes = [
    {path: 'nav', component: NavbarComponent,
         children: [
            // Home page
            { path: 'estudiante', component: EstudiantesComponent },
            { path: 'libros', component: LibrosComponent },
            { path: 'prestamos', component: PrestamosComponent },
            { path: 'devoluciones', component: DevolucionesComponent },
        ],
    },
    { path: '**', redirectTo: 'nav' }

];
