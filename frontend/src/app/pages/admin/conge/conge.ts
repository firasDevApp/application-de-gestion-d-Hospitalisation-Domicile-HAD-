import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepondreConge } from '../../../components/admin/modals/repondre-conge/repondre-conge';

interface Conge {
  id: number;
  infirmier: {
    id: number;
    nom: string;
    prenom: string;
    matricule: string;
    avatarColor: string;
  };
  type: string;
  dateDebut: string;
  dateFin: string;
  duree: number;
  statut: 'en_attente' | 'approuve' | 'refuse' | 'annule';
  dateDemande: string;
  motif: string;
  pieceJointe?: string;
  commentaireAdmin?: string;
  dateReponse?: string;
}

@Component({
  selector: 'app-admin-conge',
  standalone: true,
  imports: [CommonModule, FormsModule, RepondreConge],
  templateUrl: './conge.html',
  styleUrls: ['./conge.css']
})
export class AdminConge implements OnInit {
  // États
  showRepondreModal = false;
  selectedConge: Conge | null = null;
  filtreStatut = 'tous';
  filtreType = 'tous';
  recherche = '';

  // Liste des congés
  conges: Conge[] = [
    {
      id: 1,
      infirmier: {
        id: 101,
        nom: 'Martin',
        prenom: 'Sophie',
        matricule: 'INF-2023-001',
        avatarColor: '#4ecdc4'
      },
      type: 'annuel',
      dateDebut: '2024-12-15',
      dateFin: '2024-12-22',
      duree: 7,
      statut: 'en_attente',
      dateDemande: '2024-11-10',
      motif: 'Vacances familiales',
      pieceJointe: 'certificat.pdf'
    },
    {
      id: 2,
      infirmier: {
        id: 102,
        nom: 'Dubois',
        prenom: 'Pierre',
        matricule: 'INF-2023-002',
        avatarColor: '#45b7d1'
      },
      type: 'maladie',
      dateDebut: '2024-11-20',
      dateFin: '2024-11-25',
      duree: 5,
      statut: 'approuve',
      dateDemande: '2024-11-15',
      motif: 'Grippe avec certificat médical',
      pieceJointe: 'medical.pdf',
      commentaireAdmin: 'Congé approuvé, bon rétablissement',
      dateReponse: '2024-11-16'
    },
    {
      id: 3,
      infirmier: {
        id: 103,
        nom: 'Leroy',
        prenom: 'Marie',
        matricule: 'INF-2023-003',
        avatarColor: '#ff6b6b'
      },
      type: 'exceptionnel',
      dateDebut: '2024-12-01',
      dateFin: '2024-12-03',
      duree: 3,
      statut: 'refuse',
      dateDemande: '2024-11-18',
      motif: 'Mariage frère',
      commentaireAdmin: 'Refusé en raison du planning chargé de décembre',
      dateReponse: '2024-11-19'
    },
    {
      id: 4,
      infirmier: {
        id: 104,
        nom: 'Moreau',
        prenom: 'Thomas',
        matricule: 'INF-2023-004',
        avatarColor: '#ffa726'
      },
      type: 'annuel',
      dateDebut: '2024-11-25',
      dateFin: '2024-11-30',
      duree: 5,
      statut: 'en_attente',
      dateDemande: '2024-11-12',
      motif: 'Voyage prévu depuis 6 mois'
    },
    {
      id: 5,
      infirmier: {
        id: 105,
        nom: 'Petit',
        prenom: 'Julie',
        matricule: 'INF-2023-005',
        avatarColor: '#667eea'
      },
      type: 'maternite',
      dateDebut: '2024-12-01',
      dateFin: '2025-02-28',
      duree: 90,
      statut: 'approuve',
      dateDemande: '2024-11-01',
      motif: 'Congé maternité',
      pieceJointe: 'avis-medical.pdf',
      commentaireAdmin: 'Congé maternité approuvé',
      dateReponse: '2024-11-02'
    }
  ];

  // Types de congés
  typesConges = [
    { value: 'annuel', label: 'Congé annuel', icon: 'fa-sun', color: '#ffa726' },
    { value: 'maladie', label: 'Congé maladie', icon: 'fa-heart-pulse', color: '#ff6b6b' },
    { value: 'exceptionnel', label: 'Congé exceptionnel', icon: 'fa-star', color: '#667eea' },
    { value: 'maternite', label: 'Congé maternité', icon: 'fa-baby', color: '#4ecdc4' },
    { value: 'paternite', label: 'Congé paternité', icon: 'fa-child', color: '#45b7d1' },
    { value: 'formation', label: 'Congé formation', icon: 'fa-graduation-cap', color: '#764ba2' }
  ];

  // Statistiques
  stats = {
    total: 0,
    enAttente: 0,
    approuves: 0,
    refuses: 0
  };

  ngOnInit() {
    this.calculerStats();
  }

  // Filtrer les congés
  get congesFiltres(): Conge[] {
    let result = [...this.conges];

    // Filtre par statut
    if (this.filtreStatut !== 'tous') {
      result = result.filter(c => c.statut === this.filtreStatut);
    }

    // Filtre par type
    if (this.filtreType !== 'tous') {
      result = result.filter(c => c.type === this.filtreType);
    }

    // Recherche
    if (this.recherche.trim()) {
      const search = this.recherche.toLowerCase();
      result = result.filter(c => 
        c.infirmier.nom.toLowerCase().includes(search) ||
        c.infirmier.prenom.toLowerCase().includes(search) ||
        c.infirmier.matricule.toLowerCase().includes(search) ||
        c.motif.toLowerCase().includes(search)
      );
    }

    return result;
  }

  // Calculer les statistiques
  calculerStats() {
    this.stats = {
      total: this.conges.length,
      enAttente: this.conges.filter(c => c.statut === 'en_attente').length,
      approuves: this.conges.filter(c => c.statut === 'approuve').length,
      refuses: this.conges.filter(c => c.statut === 'refuse').length
    };
  }

  // Ouvrir modal de réponse
  openRepondreModal(conge: Conge) {
    this.selectedConge = { ...conge };
    this.showRepondreModal = true;
  }

  // Fermer modal
  closeRepondreModal() {
    this.showRepondreModal = false;
    this.selectedConge = null;
  }

  // Traiter la réponse
  onReponseTraitee(reponse: any) {
    const index = this.conges.findIndex(c => c.id === reponse.congeId);
    if (index !== -1) {
      this.conges[index] = {
        ...this.conges[index],
        statut: reponse.decision,
        commentaireAdmin: reponse.commentaire,
        dateReponse: new Date().toISOString().split('T')[0]
      };
      this.calculerStats();
    }
    this.closeRepondreModal();
  }

  // Télécharger pièce jointe
  telechargerPieceJointe(conge: Conge) {
    if (conge.pieceJointe) {
      console.log('Téléchargement de:', conge.pieceJointe);
      // Implémentez la logique de téléchargement ici
    }
  }

  // Voir les détails
  voirDetails(conge: Conge) {
    // Vous pouvez implémenter une modal de détails ici
    console.log('Détails du congé:', conge);
  }

  // Exporter en PDF
  exporterPDF() {
    console.log('Exportation PDF des congés');
  }

  // Exporter en Excel
  exporterExcel() {
    console.log('Exportation Excel des congés');
  }

  // Obtenir le label du type
  getTypeLabel(type: string): string {
    const typeObj = this.typesConges.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  }

  // Obtenir l'icône du type
  getTypeIcon(type: string): string {
    const typeObj = this.typesConges.find(t => t.value === type);
    return typeObj ? typeObj.icon : 'fa-calendar';
  }

  // Obtenir la couleur du type
  getTypeColor(type: string): string {
    const typeObj = this.typesConges.find(t => t.value === type);
    return typeObj ? typeObj.color : '#718096';
  }

  // Obtenir le label du statut
  getStatutLabel(statut: string): string {
    const labels: {[key: string]: string} = {
      'en_attente': 'En attente',
      'approuve': 'Approuvé',
      'refuse': 'Refusé',
      'annule': 'Annulé'
    };
    return labels[statut] || statut;
  }

  // Obtenir la classe CSS pour le statut
  getStatutClass(statut: string): string {
    const classes: {[key: string]: string} = {
      'en_attente': 'badge-warning',
      'approuve': 'badge-success',
      'refuse': 'badge-danger',
      'annule': 'badge-secondary'
    };
    return classes[statut] || '';
  }
}