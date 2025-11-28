import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRapport } from '../../components/modal-rapport/modal-rapport';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule, ModalRapport],
  templateUrl: './rapport.html',
  styleUrls: ['./rapport.css']
})
export class Rapport {
  showModalRapport = false;
  visiteSelectionnee: any = null;

  // Visites terminées (pour créer des rapports)
  visitesTerminees = [
    {
      id: 'HAD-75842',
      patient: 'Martin Dupont',
      typeSoin: 'Pansement complexe',
      date: '2023-11-12',
      image: 'assets/images/faces/face1.jpg',
      infirmier: 'Vous'
    },
    {
      id: 'HAD-75911',
      patient: 'Sophie Laurent', 
      typeSoin: 'Injection IV',
      date: '2023-11-10',
      image: 'assets/images/faces/face2.jpg',
      infirmier: 'Vous'
    }
  ];

  // Rapports existants
  rapports = [
    {
      id: 'RAP-2023-001',
      visiteId: 'HAD-75840',
      patient: 'Robert Garnier',
      typeSoin: 'Surveillance post-opératoire',
      dateVisite: '2023-11-08',
      dateCreation: '2023-11-08 16:30:00',
      statut: 'VALIDÉ',
      destinataire: 'administration@had.fr',
      infirmier: 'Vous'
    },
    {
      id: 'RAP-2023-002',
      visiteId: 'HAD-75835',
      patient: 'Claire Moreau',
      typeSoin: 'Soins de nursing',
      dateVisite: '2023-11-05',
      dateCreation: '2023-11-05 15:45:00',
      statut: 'VALIDÉ',
      destinataire: 'administration@had.fr',
      infirmier: 'Vous'
    },
    {
      id: 'RAP-2023-003',
      visiteId: 'HAD-75830',
      patient: 'Jean Petit',
      typeSoin: 'Pansement simple',
      dateVisite: '2023-11-03',
      dateCreation: '2023-11-03 17:20:00',
      statut: 'EN_ATTENTE',
      destinataire: 'administration@had.fr',
      infirmier: 'Vous'
    }
  ];

  ouvrirModalRapport(visite: any) {
    this.visiteSelectionnee = { ...visite };
    this.showModalRapport = true;
  }

  onRapportSoumis(nouveauRapport: any) {
    // Ajouter le nouveau rapport à la liste
    this.rapports.unshift(nouveauRapport);
    
    // Retirer la visite de la liste des visites terminées
    this.visitesTerminees = this.visitesTerminees.filter(
      v => v.id !== nouveauRapport.visiteId
    );
    
    this.fermerModalRapport();
    
    // Ici vous pouvez appeler un service pour sauvegarder
    console.log('Nouveau rapport soumis:', nouveauRapport);
  }

  fermerModalRapport() {
    this.showModalRapport = false;
    this.visiteSelectionnee = null;
  }

  getBadgeClass(statut: string): string {
    switch (statut) {
      case 'VALIDÉ': return 'badge badge-gradient-success';
      case 'ENVOYÉ': return 'badge badge-gradient-info';
      case 'EN_ATTENTE': return 'badge badge-gradient-warning';
      case 'REJETÉ': return 'badge badge-gradient-danger';
      default: return 'badge badge-gradient-secondary';
    }
  }

  getStatutLabel(statut: string): string {
    const statuts: { [key: string]: string } = {
      'VALIDÉ': 'Validé',
      'ENVOYÉ': 'Envoyé',
      'EN_ATTENTE': 'En attente',
      'REJETÉ': 'Rejeté'
    };
    return statuts[statut] || statut;
  }

  visualiserRapport(rapport: any) {
    // Logique pour visualiser un rapport existant
    console.log('Visualiser rapport:', rapport);
    // Vous pouvez ouvrir un autre modal ou naviguer vers une page détail
  }

  telechargerRapport(rapport: any) {
    // Logique pour télécharger le rapport en PDF
    console.log('Télécharger rapport:', rapport);
  }
}