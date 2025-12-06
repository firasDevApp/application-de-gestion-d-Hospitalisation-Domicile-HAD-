import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-footer.html',
  styleUrls: ['./patient-footer.css']
})
export class PatientFooter {
  emergencyPhone = '71 234 567';
  email = 'contact@had-jendouba.tn';
  lastLogin = 'Aujourd\'hui 10:30';
}