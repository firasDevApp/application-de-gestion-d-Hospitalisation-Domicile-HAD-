import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientHeader } from '../../../components/patient/patient-header/patient-header';
import { PatientNav } from '../../../components/patient/patient-nav/patient-nav';
import { PatientFooter } from '../../../components/patient/patient-footer/patient-footer';
import { Chatbot } from '../../../components/chatbot/chatbot';
@Component({
  selector: 'app-patient-dossier-medical',
  imports: [CommonModule,  PatientHeader, PatientNav, PatientFooter, Chatbot],
  templateUrl: './patient-dossier-medical.html',
  styleUrl: './patient-dossier-medical.css',
})
export class PatientDossierMedical {

}
