import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-rapport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-rapport.html',
  styleUrls: ['./modal-rapport.css']
})
export class ModalRapport {
  @Input() visiteData: any;
  @Output() rapportSoumis = new EventEmitter<any>();
  @Output() modalFerme = new EventEmitter<void>();

  rapport = {
    observations: '',
    soinsRealises: '',
    evolution: 'STABLE',
    medicaments: '',
    incidents: '',
    recommandations: '',
    transmission: ''
  };

  evolutionOptions = [
    { value: 'AMELIORATION', label: 'Amélioration' },
    { value: 'STABLE', label: 'État stable' },
    { value: 'AGGRAVATION', label: 'Aggravation' },
    { value: 'INQUIETANT', label: 'État inquiétant' }
  ];

  soumettreRapport() {
    if (this.formValide()) {
      const rapportComplet = {
        ...this.rapport,
        id: 'RAP-' + Date.now(),
        visiteId: this.visiteData.id,
        patient: this.visiteData.patient,
        typeSoin: this.visiteData.typeSoin,
        dateVisite: this.visiteData.date,
        dateCreation: new Date().toISOString(),
        statut: 'ENVOYÉ',
        destinataire: 'administration@had.fr'
      };

      this.rapportSoumis.emit(rapportComplet);
      this.reinitialiserFormulaire();
    }
  }

  formValide(): boolean {
    return !!this.rapport.observations && 
           !!this.rapport.soinsRealises &&
           !!this.rapport.evolution;
  }

  reinitialiserFormulaire() {
    this.rapport = {
      observations: '',
      soinsRealises: '',
      evolution: 'STABLE',
      medicaments: '',
      incidents: '',
      recommandations: '',
      transmission: ''
    };
  }

  fermer() {
    this.modalFerme.emit();
  }
}