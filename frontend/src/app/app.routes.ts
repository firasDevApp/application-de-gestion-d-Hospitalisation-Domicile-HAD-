import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Conge } from './pages/conge/conge';
import { Visite } from './pages/visite/visite';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'conges', component: Conge},
  { path: 'visites', component: Visite},
];
