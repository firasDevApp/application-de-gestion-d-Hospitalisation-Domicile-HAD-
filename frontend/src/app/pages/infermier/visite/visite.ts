import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalStatutVisit } from '../../../components/infermier/modal-statut-visit/modal-statut-visit';

@Component({
  selector: 'app-visite',
  standalone: true,
  imports: [CommonModule, ModalStatutVisit],
  templateUrl: './visite.html',
  styleUrls: ['./visite.css']
})
export class Visite {
  showModal = false;
  visiteSelectionnee: any = null;

  visites = [
    {
      id: 'HAD-75842',
      patient: 'Raed Touati',
      typeSoin: 'Pansement complexe',
      statut: 'TERMINÉ',
      date: '2023-11-12',
      image: 'assets/images/faces/face1.jpg'
    },
    {
      id: 'HAD-75913',
      patient: 'Amal Abidi',
      typeSoin: 'Injection IV',
      statut: 'EN COURS',
      date: '2023-11-15',
      image: 'assets/images/faces/face2.jpg'
    },
    {
      id: 'HAD-76028',
      patient: 'Fadi Hamdi',
      typeSoin: 'Surveillance post-opératoire',
      statut: 'ANNULÉ',
      date: '2023-11-18',
      image: 'assets/images/faces/face3.jpg'
    },
    {
      id: 'HAD-76145',
      patient: 'Hamza Ben Younes',
      typeSoin: 'Soins de nursing',
      statut: 'REPORTÉ',
      date: '2023-11-20',
      image: 'assets/images/faces/face4.jpg'
    }
  ];

  ouvrirModal(visite: any) {
    this.visiteSelectionnee = { ...visite };
    this.showModal = true;
  }

  onStatutUpdated(updatedVisite: any) {
    // Mettre à jour la visite dans le tableau
    const index = this.visites.findIndex(v => v.id === updatedVisite.id);
    if (index !== -1) {
      this.visites[index] = { ...updatedVisite };
    }
    
    // Ici vous pouvez appeler un service pour sauvegarder en base de données
    console.log('Visite mise à jour:', updatedVisite);
    
    this.fermerModal();
  }

  fermerModal() {
    this.showModal = false;
    this.visiteSelectionnee = null;
  }

  getBadgeClass(statut: string): string {
    switch (statut) {
      case 'TERMINÉ': return 'badge-gradient-success';
      case 'EN COURS': return 'badge-gradient-warning';
      case 'PLANIFIÉ': return 'badge-gradient-info';
      case 'REPORTÉ': return 'badge-gradient-danger';
      case 'ANNULÉ': return 'badge-gradient-danger';
      default: return 'badge-gradient-secondary';
    }
  }
}