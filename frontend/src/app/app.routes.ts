import { Routes } from '@angular/router';

// Pages d'authentification
import { SigninSignup } from './pages/auth/signin-signup/signin-signup';

// Pages infirmier
import { Dashboard } from './pages/infermier/dashboard/dashboard';
import { Conge } from './pages/infermier/conge/conge';
import { Visite } from './pages/infermier/visite/visite';
import { Planning } from './pages/infermier/planning/planning';
import { Rapport } from './pages/infermier/rapport/rapport';



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
  
  
  
  
  // Routes de fallback
  { path: 'infermier/**', redirectTo: 'infermier/dashboard' },
  { path: '**', redirectTo: '/signin' }
];