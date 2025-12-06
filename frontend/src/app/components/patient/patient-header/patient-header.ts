import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-header.html',
  styleUrls: ['./patient-header.css']
})
export class PatientHeader {
  @Output() emergencyClicked = new EventEmitter<void>();
  
  patient = {
    initials: 'JM',
    name: 'M. Jean Martin',
    age: 72,
    condition: 'Diabète type 2',
    since: '06/2023',
    status: 'En suivi actif'
  };

  onEmergencyClick() {
    if (confirm('Voulez-vous appeler l\'équipe d\'urgence ?')) {
      this.emergencyClicked.emit();
    }
  }
}