import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemandeConge } from '../../../components/infermier/modal-demande-conge/modal-demande-conge';

@Component({
  selector: 'app-conge',
  standalone: true,
  imports: [CommonModule, ModalDemandeConge],
  templateUrl: './conge.html',
  styleUrls: ['./conge.css']
})
export class Conge {
  showModalDemande = false;

  conges = [
     {
      id: 'CONG-2023-003',
      type: 'EXCEPTIONNEL',
      dateDebut: '2025-10-20',
      dateFin: '2025-10-20',
      jours: 1,
      motif: 'Rendez-vous familial',
      statut: 'EN_ATTENTE',
      dateSoumission: '2025-10-15',
      dateValidation: null,
      validateur: null
    },
    {
      id: 'CONG-2023-001',
      type: 'ANNUEL',
      dateDebut: '2025-08-01',
      dateFin: '2025-08-15',
      jours: 15,
      motif: 'Vacances été',
      statut: 'VALIDÉ',
      dateSoumission: '2025-06-15',
      dateValidation: '2025-06-20',
      validateur: 'Dr. Firas'
    },
    {
      id: 'CONG-2023-002',
      type: 'MALADIE',
      dateDebut: '2025-09-10',
      dateFin: '2025-09-12',
      jours: 3,
      motif: 'Grippe',
      statut: 'VALIDÉ',
      dateSoumission: '2025-09-09',
      dateValidation: '2025-09-10',
      validateur: 'Dr. Firas'
    },
    {
      id: 'CONG-2023-004',
      type: 'FORMATION',
      dateDebut: '2025-11-05',
      dateFin: '2025-11-07',
      jours: 3,
      motif: 'Formation continue soins palliatifs',
      statut: 'REFUSÉ',
      dateSoumission: '2025-10-20',
      dateValidation: '2025-10-25',
      validateur: 'Dr. Firas',
      motifRefus: 'Période de forte activité'
    }
  ];

  ouvrirModalDemande() {
    this.showModalDemande = true;
  }

  onDemandeSoumise(nouvelleDemande: any) {
    // Ajouter la nouvelle demande à l'historique
    this.conges.unshift(nouvelleDemande);
    this.fermerModalDemande();
    
    // Ici vous pouvez appeler un service pour sauvegarder
    console.log('Nouvelle demande soumise:', nouvelleDemande);
  }

  fermerModalDemande() {
    this.showModalDemande = false;
  }

  getBadgeClass(statut: string): string {
    switch (statut) {
      case 'VALIDÉ': return 'badge badge-gradient-success';
      case 'EN_ATTENTE': return 'badge badge-gradient-warning';
      case 'REFUSÉ': return 'badge badge-gradient-danger';
      default: return 'badge badge-gradient-secondary';
    }
  }

  getTypeLabel(type: string): string {
    const types: { [key: string]: string } = {
      'ANNUEL': 'Congé annuel',
      'MALADIE': 'Congé maladie',
      'EXCEPTIONNEL': 'Congé exceptionnel',
      'FORMATION': 'Congé formation',
      'MATERNITE': 'Congé maternité',
      'PATERNITE': 'Congé paternité'
    };
    return types[type] || type;
  }

  getStatutLabel(statut: string): string {
    const statuts: { [key: string]: string } = {
      'VALIDÉ': 'Validé',
      'EN_ATTENTE': 'En attente',
      'REFUSÉ': 'Refusé'
    };
    return statuts[statut] || statut;
  }
}