import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Conge } from './pages/conge/conge';
import { Visite } from './pages/visite/visite';
import { Planning } from './pages/planning/planning';
import { Rapport } from './pages/rapport/rapport';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'planning', component: Planning},
  { path: 'conges', component: Conge},
  { path: 'visites', component: Visite},
  { path: 'rapports', component: Rapport},
];
