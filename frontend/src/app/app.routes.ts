import { Routes } from '@angular/router';

// Pages d'authentification
import { SigninSignup } from './pages/auth/signin-signup/signin-signup';

// Pages infirmier
import { Dashboard } from './pages/infermier/dashboard/dashboard';
import { Conge } from './pages/infermier/conge/conge';
import { Visite } from './pages/infermier/visite/visite';
import { Planning } from './pages/infermier/planning/planning';
import { Rapport } from './pages/infermier/rapport/rapport';

// Pages admin
import { AdminDashboard } from './pages/admin/dashboard/dashboard';
import { AdminPlanning } from './pages/admin/planning/planning';
import { AdminConge } from './pages/admin/conge/conge';
import { AdminVisite } from './pages/admin/visite/visite';
import { AdminRapport } from './pages/admin/rapport/rapport';
import { Users } from './pages/admin/users/users';


export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SigninSignup },
  
  // Routes infirmier avec chemins complets
  { path: 'infermier/dashboard', component: Dashboard },
  { path: 'infermier/planning', component: Planning },
  { path: 'infermier/conges', component: Conge },
  { path: 'infermier/visites', component: Visite },
  { path: 'infermier/rapports', component: Rapport },
  { path: 'infermier', redirectTo: 'infermier/dashboard', pathMatch: 'full' },
  
   // Routes admin avec chemins complets
  { path: 'admin/dashboard', component: AdminDashboard },
  { path: 'admin/planning', component: AdminPlanning },
  { path: 'admin/conges', component: AdminConge },
  { path: 'admin/visites', component: AdminVisite },
  { path: 'admin/rapports', component: AdminRapport },
  { path: 'admin/users', component: Users },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  
  
  
  // Routes de fallback
  { path: 'infermier/**', redirectTo: 'infermier/dashboard' },
  { path: 'admin/**', redirectTo: 'admin/dashboard' },
  { path: '**', redirectTo: '/signin' }
];