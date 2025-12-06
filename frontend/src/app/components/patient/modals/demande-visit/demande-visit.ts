import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  professionals = [
    { id: 1, name: 'Dr. Sophie Martin', specialty: 'Médecin Généraliste' },
    { id: 2, name: 'Dr. Jean Dupont', specialty: 'Cardiologue' },
    { id: 3, name: 'Inf. Pierre Moreau', specialty: 'Infirmier' },
    { id: 4, name: 'Inf. Marie Lambert', specialty: 'Infirmière' },
    { id: 5, name: 'Dr. Paul Bernard', specialty: 'Kinésithérapeute' }
  ];

  // Priorités
  priorities = [
    { id: 'normal', name: 'Normale', color: '#4ecdc4' },
    { id: 'urgent', name: 'Urgente', color: '#ff6b6b' },
    { id: 'programmee', name: 'Programmée', color: '#45b7d1' }
  ];

  // Données du formulaire
  formData = {
    visitType: '',
    professional: '',
    date: '',
    time: '',
    priority: 'normal',
    description: '',
    symptoms: '',
    isEmergency: false,
    preferredTimeSlot: 'morning'
  };

  // Crénaux horaires
  timeSlots = [
    { value: 'morning', label: 'Matin (8h - 12h)' },
    { value: 'afternoon', label: 'Après-midi (14h - 18h)' },
    { value: 'evening', label: 'Soir (18h - 20h)' },
    { value: 'anytime', label: 'À tout moment' }
  ];

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

    // Validation
    if (!this.formData.visitType) {
      this.errors.push('Veuillez sélectionner un type de visite');
    }
    if (!this.formData.date) {
      this.errors.push('Veuillez sélectionner une date');
    }
    if (!this.formData.time && !this.formData.preferredTimeSlot) {
      this.errors.push('Veuillez sélectionner un horaire');
    }
    if (!this.formData.description) {
      this.errors.push('Veuillez décrire la raison de la visite');
    }

    // Vérifier si la date est disponible
    if (this.formData.date && this.unavailableDates.includes(this.formData.date)) {
      this.errors.push('Cette date n\'est pas disponible. Veuillez en choisir une autre.');
    }

    if (this.errors.length > 0) {
      this.isSubmitting = false;
      return;
    }

    // Simuler un appel API
    setTimeout(() => {
      const visitRequest = {
        ...this.formData,
        id: Date.now(),
        status: 'pending',
        requestedAt: new Date().toISOString(),
        patientName: 'Jean Dupont' // À remplacer par les données du patient connecté
      };

      this.visitRequested.emit(visitRequest);
      this.isSubmitting = false;
      
      // Réinitialiser le formulaire
      this.formData = {
        visitType: '',
        professional: '',
        date: '',
        time: '',
        priority: 'normal',
        description: '',
        symptoms: '',
        isEmergency: false,
        preferredTimeSlot: 'morning'
      };

      this.onClose();
    }, 1500);
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

  // Changer la priorité en urgence
  setEmergency() {
    this.formData.isEmergency = true;
    this.formData.priority = 'urgent';
    this.formData.preferredTimeSlot = 'anytime';
  }
}