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
// Pages patient
import { PatientDashboard } from './pages/patient/patient-dashboard/patient-dashboard';
import { PatientVisite } from './pages/patient/patient-visite/patient-visite';
import { PatientDossierMedical } from './pages/patient/patient-dossier-medical/patient-dossier-medical';
import { AboutUs } from './pages/patient/about-us/about-us';
import { Contact } from './pages/contact/contact';


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
  
  // Routes patient avec chemins complets
  { path: 'patient/home', component: PatientDashboard },
  { path: 'patient/visites', component: PatientVisite },
  { path: 'patient/dossier', component: PatientDossierMedical },
  { path: 'patient/about-us', component: AboutUs },
  { path: 'patient/contact', component: Contact },
  { path: 'patient', redirectTo: 'patient/home', pathMatch: 'full' },
  
  
  // Routes de fallback
  { path: 'infermier/**', redirectTo: 'infermier/dashboard' },
  { path: 'admin/**', redirectTo: 'admin/dashboard' },
  { path: 'patient/**', redirectTo: 'patient/home' },
  { path: '**', redirectTo: '/signin' }
];