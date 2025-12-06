import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeVisit } from '../../../components/patient/modals/demande-visit/demande-visit';

@Component({
  selector: 'app-patient-visite',
  standalone: true,
  imports: [CommonModule, DemandeVisit],
  templateUrl: './patient-visite.html',
  styleUrls: ['./patient-visite.css']
})
export class PatientVisite {
  // État du modal
  showDemandeModal = false;

  // Données des visites (exemple)
  upcomingVisits = [
    {
      id: 1,
      date: '15',
      month: 'NOV',
      time: '10:00',
      title: 'Pansement plaie diabétique',
      status: 'Confirmé',
      professional: 'Infirmier Pierre Moreau',
      duration: '30 minutes',
      notes: ''
    },
    {
      id: 2,
      date: '18',
      month: 'NOV',
      time: '14:30',
      title: 'Bilan trimestriel',
      status: 'En attente',
      professional: 'Dr. Sophie Bernard',
      duration: '45 minutes',
      notes: 'Prise de sang requise avant la visite'
    }
  ];

  visitHistory = [
    {
      id: 1,
      date: '12/11/2023',
      time: '10:00',
      professional: { name: 'Inf. Pierre Moreau', initials: 'PM', color: '#4ecdc4' },
      type: 'Pansement plaie diabétique',
      duration: '35 min',
      status: 'Terminé'
    },
    {
      id: 2,
      date: '08/11/2023',
      time: '11:30',
      professional: { name: 'Dr. Sophie Bernard', initials: 'SB', color: '#ff6b6b' },
      type: 'Consultation de suivi',
      duration: '40 min',
      status: 'Terminé'
    },
    {
      id: 3,
      date: '05/11/2023',
      time: '09:15',
      professional: { name: 'Inf. Pierre Moreau', initials: 'PM', color: '#4ecdc4' },
      type: 'Surveillance glycémique',
      duration: '25 min',
      status: 'Terminé'
    }
  ];

  // Ouvrir le modal
  openDemandeModal() {
    this.showDemandeModal = true;
  }

  // Fermer le modal
  closeDemandeModal() {
    this.showDemandeModal = false;
  }

  // Gérer la demande de visite soumise
  onVisitRequested(visitData: any) {
    console.log('Demande de visite soumise:', visitData);
    
    // Ajouter à la liste des visites en attente
    this.upcomingVisits.unshift({
      id: Date.now(),
      date: new Date(visitData.date).getDate().toString(),
      month: new Date(visitData.date).toLocaleString('fr-FR', { month: 'short' }).toUpperCase(),
      time: visitData.time || 'À déterminer',
      title: this.getVisitTypeLabel(visitData.visitType),
      status: 'En attente',
      professional: 'À attribuer',
      duration: 'À déterminer',
      notes: ''
    });

    // Fermer le modal
    this.closeDemandeModal();

    // Afficher une notification (vous pouvez ajouter un service de notification)
    alert('Votre demande de visite a été envoyée avec succès !');
  }

  // Obtenir le libellé du type de visite
  private getVisitTypeLabel(typeId: string): string {
    const types: { [key: string]: string } = {
      'consultation': 'Consultation médicale',
      'pansement': 'Pansement',
      'injection': 'Injection',
      'surveillance': 'Surveillance',
      'bilan': 'Bilan de santé',
      'urgence': 'Visite d\'urgence'
    };
    return types[typeId] || 'Visite médicale';
  }

  // Actions sur les visites
  reporterVisite(visitId: number) {
    console.log('Reporter visite:', visitId);
    // Implémenter la logique de report
  }

  voirRapport(visitId: number) {
    console.log('Voir rapport:', visitId);
    // Implémenter la logique d'affichage du rapport
  }

  voirItineraire(visitId: number) {
    console.log('Voir itinéraire:', visitId);
    // Implémenter la logique d'itinéraire
  }
}