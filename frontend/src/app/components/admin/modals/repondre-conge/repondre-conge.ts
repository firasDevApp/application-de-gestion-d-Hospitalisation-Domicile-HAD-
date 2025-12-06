import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repondre-conge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './repondre-conge.html',
  styleUrls: ['./repondre-conge.css']
})
export class RepondreConge {
  @Input() conge: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() reponseTraitee = new EventEmitter<any>();

  // Options de décision
  decisions = [
    { value: 'approuve', label: 'Approuver', icon: 'fa-check-circle', color: '#4ecdc4' },
    { value: 'refuse', label: 'Refuser', icon: 'fa-times-circle', color: '#ff6b6b' },
    { value: 'modifier', label: 'Modifier la période', icon: 'fa-edit', color: '#45b7d1' }
  ];

  // Données du formulaire
  formData = {
    decision: '',
    commentaire: '',
    nouvelleDateDebut: '',
    nouvelleDateFin: '',
    avecAlerte: true
  };

  isSubmitting = false;
  showDateModification = false;

  // Méthode pour calculer les jours depuis une date
  calculerJoursDepuis(dateString: string): number {
    if (!dateString) return 0;
    
    const dateDemande = new Date(dateString);
    const aujourdhui = new Date();
    const diffTime = Math.abs(aujourdhui.getTime() - dateDemande.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  }

  // Obtenir la date minimale (aujourd'hui)
  get minDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Méthode pour fermer le modal
  onClose() {
    this.closeModal.emit();
  }

  // Changer la décision
  onDecisionChange(decision: string) {
    this.formData.decision = decision;
    this.showDateModification = decision === 'modifier';
    
    // Pré-remplir le commentaire selon la décision
    if (decision === 'approuve') {
      this.formData.commentaire = 'Votre demande de congé a été approuvée. Bonnes vacances !';
    } else if (decision === 'refuse') {
      this.formData.commentaire = 'Votre demande de congé a été refusée pour les raisons suivantes :';
    } else if (decision === 'modifier') {
      this.formData.nouvelleDateDebut = this.conge.dateDebut;
      this.formData.nouvelleDateFin = this.conge.dateFin;
      this.formData.commentaire = 'Votre demande nécessite une modification de dates :';
    }
  }

  // Calculer la nouvelle durée
  get nouvelleDuree(): number {
    if (!this.formData.nouvelleDateDebut || !this.formData.nouvelleDateFin) return 0;
    
    const debut = new Date(this.formData.nouvelleDateDebut);
    const fin = new Date(this.formData.nouvelleDateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  }

  // Valider les dates
  areDatesValid(): boolean {
    if (!this.showDateModification) return true;
    
    if (!this.formData.nouvelleDateDebut || !this.formData.nouvelleDateFin) {
      return false;
    }
    
    const debut = new Date(this.formData.nouvelleDateDebut);
    const fin = new Date(this.formData.nouvelleDateFin);
    
    return fin >= debut;
  }

  // Soumettre la réponse
  onSubmit() {
    this.isSubmitting = true;

    // Validation
    if (!this.formData.decision) {
      alert('Veuillez sélectionner une décision');
      this.isSubmitting = false;
      return;
    }

    if (this.showDateModification && !this.areDatesValid()) {
      alert('Les dates de modification ne sont pas valides');
      this.isSubmitting = false;
      return;
    }

    // Simuler l'envoi
    setTimeout(() => {
      const reponse = {
        congeId: this.conge.id,
        decision: this.formData.decision,
        commentaire: this.formData.commentaire,
        nouvelleDateDebut: this.formData.nouvelleDateDebut,
        nouvelleDateFin: this.formData.nouvelleDateFin,
        avecAlerte: this.formData.avecAlerte,
        dateReponse: new Date().toISOString()
      };

      this.reponseTraitee.emit(reponse);
      this.isSubmitting = false;
    }, 1500);
  }

  // Obtenir la couleur du type
  getTypeColor(type: string): string {
    const colors: {[key: string]: string} = {
      'annuel': '#ffa726',
      'maladie': '#ff6b6b',
      'exceptionnel': '#667eea',
      'maternite': '#4ecdc4',
      'paternite': '#45b7d1',
      'formation': '#764ba2'
    };
    return colors[type] || '#718096';
  }

  // Calculer la durée originale
  get dureeOriginale(): number {
    const debut = new Date(this.conge.dateDebut);
    const fin = new Date(this.conge.dateFin);
    const diffTime = Math.abs(fin.getTime() - debut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return diffDays;
  }

  // Calculer le solde de congés (exemple)
  get soldeConges(): number {
    // Cette méthode devrait appeler un service pour obtenir le solde réel
    return 25; // Exemple
  }

  // Obtenir le label du type
  getTypeLabel(type: string): string {
    const labels: {[key: string]: string} = {
      'annuel': 'Congé annuel',
      'maladie': 'Congé maladie',
      'exceptionnel': 'Congé exceptionnel',
      'maternite': 'Congé maternité',
      'paternite': 'Congé paternité',
      'formation': 'Congé formation'
    };
    return labels[type] || type;
  }

  // Formater la date pour l'affichage
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}