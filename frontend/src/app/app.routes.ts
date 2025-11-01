import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Conge } from './pages/conge/conge';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'conges', component: Conge},
];
