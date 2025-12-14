import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisitService } from '../../../../services/visit.service';



@Component({
  selector: 'app-demande-visit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demande-visit.html',
  styleUrls: ['./demande-visit.css']
})
export class DemandeVisit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() visitRequested = new EventEmitter<any>();
constructor(private visitService: VisitService) {}
  // Types de visite disponibles
  visitTypes = [
    { id: 'consultation', name: 'Consultation médicale' },
    { id: 'pansement', name: 'Pansement' },
    { id: 'injection', name: 'Injection' },
    { id: 'surveillance', name: 'Surveillance' },
    { id: 'bilan', name: 'Bilan de santé' },
    { id: 'urgence', name: 'Visite d\'urgence' }
  ];

  // Professionnels disponibles
  prefferedInfermier = [
    { id: "69398aebb6298de1011020e0", name: 'Dr. Sophie Martin', specialty: 'Médecin Généraliste' },
    { id: "2", name: 'Dr. Jean Dupont', specialty: 'Cardiologue' },
    { id: "3", name: 'Inf. Pierre Moreau', specialty: 'Infirmier' },
    { id: "4", name: 'Inf. Marie Lambert', specialty: 'Infirmière' },
    { id: "5", name: 'Dr. Paul Bernard', specialty: 'Kinésithérapeute' }
  ];

 

  // Données du formulaire
  formData = {
    visitType: '',
    prefferedInfermier: '',
    date: '',
    time: '',
    description: '',
    symptoms: '',
  };

 

  // Dates indisponibles (exemple)
  unavailableDates: string[] = [
    '2024-11-20',
    '2024-11-25',
    '2024-12-01'
  ];

  // État du formulaire
  isSubmitting = false;
  errors: string[] = [];

  // Méthode pour fermer le modal
  onClose() {
    this.closeModal.emit();
  }

  // Méthode pour soumettre la demande
 onSubmit() {
  this.errors = [];
  this.isSubmitting = true;

  if (!this.formData.visitType) {
    this.errors.push('Veuillez sélectionner un type de visite');
  }
  if (!this.formData.date) {
    this.errors.push('Veuillez sélectionner une date');
  }
  if (!this.formData.description) {
    this.errors.push('Veuillez décrire la raison de la visite');
  }

  if (this.errors.length > 0) {
    this.isSubmitting = false;
    return;
  }

  const payload = {
    visitType: this.formData.visitType,
    prefferedInfermier: this.formData.prefferedInfermier || null,
    date: this.formData.date,
    time: this.formData.time || null,
    description: this.formData.description,
    symptoms: this.formData.symptoms || ''
  };

  this.visitService.demandeVisit(payload).subscribe({
    next: (res) => {
      this.visitRequested.emit(res.visit);

      this.formData = {
        visitType: '',
        prefferedInfermier: '',
        date: '',
        time: '',
        description: '',
        symptoms: ''
      };

      this.isSubmitting = false;
      this.onClose();
    },
    error: (err) => {
      this.isSubmitting = false;
      this.errors.push(
        err?.error?.message || 'Erreur lors de l’envoi de la demande'
      );
    }
  });
}


  // Méthode pour définir la date d'aujourd'hui
  setToday() {
    const today = new Date().toISOString().split('T')[0];
    this.formData.date = today;
  }

  // Méthode pour définir la date de demain
  setTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.formData.date = tomorrow.toISOString().split('T')[0];
  }

  // Vérifier si une date est dans le passé
  isPastDate(date: string): boolean {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate < today;
  }

  // Obtenir la date minimale (aujourd'hui)
  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Obtenir la date maximale (3 mois)
  get maxDate(): string {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  }

  // Vérifier si une date est indisponible
  isDateUnavailable(date: string): boolean {
    return this.unavailableDates.includes(date);
  }
}