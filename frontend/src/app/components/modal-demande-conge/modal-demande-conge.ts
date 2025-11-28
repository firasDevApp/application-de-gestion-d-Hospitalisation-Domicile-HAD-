import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-demande-conge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-demande-conge.html',
  styleUrls: ['./modal-demande-conge.css']
})
export class ModalDemandeConge {
  @Output() demandeSoumise = new EventEmitter<any>();
  @Output() modalFerme = new EventEmitter<void>();

  demande = {
    type: '',
    dateDebut: '',
    dateFin: '',
    motif: '',
    commentaire: ''
  };

  typesConges = [
    { value: 'ANNUEL', label: 'Congé annuel' },
    { value: 'MALADIE', label: 'Congé maladie' },
    { value: 'EXCEPTIONNEL', label: 'Congé exceptionnel' },
    { value: 'FORMATION', label: 'Congé formation' },
    { value: 'MATERNITE', label: 'Congé maternité' },
    { value: 'PATERNITE', label: 'Congé paternité' }
  ];

  calculerJours(): number {
    if (this.demande.dateDebut && this.demande.dateFin) {
      const debut = new Date(this.demande.dateDebut);
      const fin = new Date(this.demande.dateFin);
      const diffTime = Math.abs(fin.getTime() - debut.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  }

  soumettreDemande() {
    if (this.formValide()) {
      const demandeComplete = {
        ...this.demande,
        id: 'DEM-' + Date.now(),
        dateSoumission: new Date().toISOString(),
        statut: 'EN_ATTENTE',
        joursDemandes: this.calculerJours()
      };

      this.demandeSoumise.emit(demandeComplete);
      this.reinitialiserFormulaire();
    }
  }

  formValide(): boolean {
    return !!this.demande.type && 
           !!this.demande.dateDebut && 
           !!this.demande.dateFin && 
           !!this.demande.motif;
  }

  reinitialiserFormulaire() {
    this.demande = {
      type: '',
      dateDebut: '',
      dateFin: '',
      motif: '',
      commentaire: ''
    };
  }

  fermer() {
    this.modalFerme.emit();
  }
}