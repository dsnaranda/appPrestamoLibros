import { Routes } from '@angular/router';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

export const routes: Routes = [
    {path: 'nav', component: NavbarComponent,
         children: [
            // Home page
            { path: 'home', component: EstudiantesComponent },
        ],
    },
    { path: '**', redirectTo: 'nav' }

];
