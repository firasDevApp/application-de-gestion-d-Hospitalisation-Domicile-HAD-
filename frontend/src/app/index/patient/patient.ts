// patient.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Ajouté pour *ngIf
import { PatientHeader } from '../../components/patient/patient-header/patient-header';
import { PatientNav } from '../../components/patient/patient-nav/patient-nav';
import { PatientFooter } from '../../components/patient/patient-footer/patient-footer';
import { Chatbot } from '../../components/chatbot/chatbot';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule, // Important pour *ngIf
    PatientHeader,
    PatientNav,
    PatientFooter,
    Chatbot
  ],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class Patient {
  // Variable pour contrôler l'affichage du spinner
  isLoading = false;
  
  // Vous pouvez déclencher le chargement via différents événements
  // Par exemple, lors de la navigation entre les routes
  
  // Méthode pour simuler un chargement (à adapter selon vos besoins)
  simulateLoading() {
    this.isLoading = true;
    
    // Simule un chargement de 2 secondes
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
  // Option: écouter les événements de navigation du router
  // Vous pouvez injecter le Router si besoin
}