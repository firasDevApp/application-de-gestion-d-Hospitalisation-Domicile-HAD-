import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface pour typer correctement les données
interface Patient {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  avatarColor: string;
}

interface Infirmier {
  id: number;
  nom: string;
  prenom: string;
  matricule: string;
  specialite: string;
  statut: string;
  chargeTravail: number;
  avatarColor: string;
  couleurCarte: string;
}

interface DemandeVisite {
  id: number;
  patient: Patient;
  infirmierSouhaite: number | null;
  infirmierAffecte: number | null; // Changez à number | null
  type: string;
  dateDemande: string;
  dateSouhaitee: string;
  heureSouhaitee: string;
  motif: string;
  description: string;
  symptomes: string;
  statut: string;
  priorite: string;
  adresseExacte: string;
  dureeEstimee: number;
}

@Component({
  selector: 'app-admin-planning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planning.html',
  styleUrls: ['./planning.css']
})
export class AdminPlanning implements OnInit {
  // Déclarez avec le bon type
  demandesVisites: DemandeVisite[] = [
    {
      id: 1,
      patient: {
        id: 101,
        nom: 'Martin',
        prenom: 'Jean',
        adresse: '15 Rue des Oliviers, 8100 Jendouba',
        telephone: '55 123 456',
        avatarColor: '#4ecdc4'
      },
      infirmierSouhaite: 3,
      infirmierAffecte: null, // null est autorisé avec number | null
      type: 'urgent',
      dateDemande: '2024-12-10',
      dateSouhaitee: '2024-12-15',
      heureSouhaitee: '08:30',
      motif: 'Douleurs thoraciques',
      description: 'Patient se plaint de douleurs thoraciques persistantes',
      symptomes: 'Douleur poitrine, essoufflement',
      statut: 'en_attente',
      priorite: 'urgent',
      adresseExacte: '15 Rue des Oliviers, Jendouba',
      dureeEstimee: 45
    },
    {
      id: 2,
      patient: {
        id: 102,
        nom: 'Curie',
        prenom: 'Marie',
        adresse: '45 Avenue de la République, 8100 Jendouba',
        telephone: '55 234 567',
        avatarColor: '#45b7d1'
      },
      infirmierSouhaite: null,
      infirmierAffecte: null,
      type: 'control',
      dateDemande: '2024-12-09',
      dateSouhaitee: '2024-12-15',
      heureSouhaitee: '09:30',
      motif: 'Contrôle tension artérielle',
      description: 'Surveillance tension après ajustement traitement',
      symptomes: '',
      statut: 'en_attente',
      priorite: 'normal',
      adresseExacte: 'Cité Sportive, Jendouba',
      dureeEstimee: 30
    },
    {
      id: 3,
      patient: {
        id: 103,
        nom: 'Durand',
        prenom: 'Robert',
        adresse: '28 Rue du Marché, 8100 Jendouba',
        telephone: '55 345 678',
        avatarColor: '#ff6b6b'
      },
      infirmierSouhaite: 4,
      infirmierAffecte: null,
      type: 'vaccination',
      dateDemande: '2024-12-08',
      dateSouhaitee: '2024-12-15',
      heureSouhaitee: '10:15',
      motif: 'Vaccin grippe saisonnière',
      description: 'Vaccination annuelle contre la grippe',
      symptomes: '',
      statut: 'en_attente',
      priorite: 'normal',
      adresseExacte: 'Souk-el Arba, Jendouba',
      dureeEstimee: 30
    }
  ];

  infirmiers: Infirmier[] = [
    {
      id: 1,
      nom: 'Bernard',
      prenom: 'Sophie',
      matricule: 'INF-2023-001',
      specialite: 'Médecin Généraliste',
      statut: 'disponible',
      chargeTravail: 3,
      avatarColor: '#4ecdc4',
      couleurCarte: '#4ecdc4'
    },
    {
      id: 2,
      nom: 'Laurent',
      prenom: 'Marc',
      matricule: 'INF-2023-002',
      specialite: 'Médecin Spécialiste',
      statut: 'disponible',
      chargeTravail: 2,
      avatarColor: '#45b7d1',
      couleurCarte: '#45b7d1'
    },
    {
      id: 3,
      nom: 'Moreau',
      prenom: 'Pierre',
      matricule: 'INF-2023-003',
      specialite: 'Infirmier',
      statut: 'disponible',
      chargeTravail: 4,
      avatarColor: '#ff6b6b',
      couleurCarte: '#ff6b6b'
    }
  ];

  typesVisite = [
    { value: 'urgent', label: 'Urgence', icon: 'fa-ambulance', color: '#ff6b6b' },
    { value: 'control', label: 'Contrôle', icon: 'fa-heart-pulse', color: '#4ecdc4' },
    { value: 'vaccination', label: 'Vaccination', icon: 'fa-syringe', color: '#45b7d1' },
    { value: 'consultation', label: 'Consultation', icon: 'fa-stethoscope', color: '#667eea' }
  ];

  showModal = false;
  selectedVisite: DemandeVisite | null = null;
  
  filtreStatut = 'en_attente';
  filtrePriorite = 'tous';
  planningFiltre: DemandeVisite[] = [];

  ngOnInit() {
    this.appliquerFiltres();
  }

  ouvrirModalAffectation(visite: DemandeVisite) {
    this.selectedVisite = visite;
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
    this.selectedVisite = null;
  }

  affecterVisite(infirmierId: number) {
    if (!this.selectedVisite) return;

    const infirmier = this.infirmiers.find(i => i.id === infirmierId);
    const visiteIndex = this.demandesVisites.findIndex(v => v.id === this.selectedVisite!.id);

    if (infirmier && infirmier.statut === 'disponible' && visiteIndex !== -1) {
      // CORRECTION ICI : Maintenant TypeScript sait que infirmierAffecte accepte number
      this.demandesVisites[visiteIndex].statut = 'affecte';
      this.demandesVisites[visiteIndex].infirmierAffecte = infirmierId;
      
      infirmier.chargeTravail += 1;

      this.appliquerFiltres();
      this.fermerModal();
      
      alert(`Visite affectée à ${infirmier.prenom} ${infirmier.nom}`);
    }
  }

  desaffecterVisite(visiteId: number) {
    const visiteIndex = this.demandesVisites.findIndex(v => v.id === visiteId);
    
    if (visiteIndex !== -1 && this.demandesVisites[visiteIndex].infirmierAffecte) {
      const infirmierId = this.demandesVisites[visiteIndex].infirmierAffecte;
      const infirmier = this.infirmiers.find(i => i.id === infirmierId);
      
      if (infirmier) {
        infirmier.chargeTravail -= 1;
      }
      
      this.demandesVisites[visiteIndex].statut = 'en_attente';
      this.demandesVisites[visiteIndex].infirmierAffecte = null;
      
      this.appliquerFiltres();
    }
  }

  appliquerFiltres() {
    let result = [...this.demandesVisites];

    if (this.filtreStatut !== 'tous') {
      result = result.filter(d => d.statut === this.filtreStatut);
    }

    if (this.filtrePriorite !== 'tous') {
      result = result.filter(d => d.priorite === this.filtrePriorite);
    }

    this.planningFiltre = result;
  }

  resetFiltres() {
    this.filtreStatut = 'en_attente';
    this.filtrePriorite = 'tous';
    this.appliquerFiltres();
  }

  // Helper functions
  getTypeLabel(type: string): string {
    const typeObj = this.typesVisite.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  }

  getTypeIcon(type: string): string {
    const typeObj = this.typesVisite.find(t => t.value === type);
    return typeObj ? typeObj.icon : 'fa-hospital';
  }

  getTypeColor(type: string): string {
    const typeObj = this.typesVisite.find(t => t.value === type);
    return typeObj ? typeObj.color : '#718096';
  }

  getStatutLabel(statut: string): string {
    const labels: {[key: string]: string} = {
      'en_attente': 'En attente',
      'affecte': 'Affectée',
      'confirme': 'Confirmée',
      'termine': 'Terminée'
    };
    return labels[statut] || statut;
  }

  getStatutClass(statut: string): string {
    const classes: {[key: string]: string} = {
      'en_attente': 'badge-warning',
      'affecte': 'badge-info',
      'confirme': 'badge-success',
      'termine': 'badge-secondary'
    };
    return classes[statut] || '';
  }

  getPrioriteLabel(priorite: string): string {
    return priorite === 'urgent' ? 'Urgente' : 'Normale';
  }

  getPrioriteClass(priorite: string): string {
    return priorite === 'urgent' ? 'badge-danger' : 'badge-success';
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  getInfirmierNom(infirmierId: number | null): string {
    if (!infirmierId) return '';
    const infirmier = this.infirmiers.find(i => i.id === infirmierId);
    return infirmier ? `${infirmier.prenom} ${infirmier.nom}` : '';
  }

  getInfirmiersDisponibles(): Infirmier[] {
    return this.infirmiers.filter(i => i.statut === 'disponible');
  }

  getStats() {
    return {
      total: this.demandesVisites.length,
      enAttente: this.demandesVisites.filter(d => d.statut === 'en_attente').length,
      affectees: this.demandesVisites.filter(d => d.statut === 'affecte').length,
      urgentes: this.demandesVisites.filter(d => d.priorite === 'urgent').length
    };
  }
}