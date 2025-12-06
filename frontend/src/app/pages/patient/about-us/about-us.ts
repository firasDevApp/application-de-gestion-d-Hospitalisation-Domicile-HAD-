import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs {
  // Équipe médicale
  medicalTeam = [
    {
      name: 'Dr. Sophie Martin',
      role: 'Médecin Généraliste',
      specialty: 'Médecine Générale',
      experience: '15 ans',
      image: 'assets/images/faces/face1.jpg',
      description: 'Spécialisée en médecine familiale et suivi des patients à domicile.'
    },
    {
      name: 'Dr. Jean Dupont',
      role: 'Cardiologue',
      specialty: 'Cardiologie',
      experience: '12 ans',
      image: 'assets/images/faces/face2.jpg',
      description: 'Expert en pathologies cardiaques et suivi post-opératoire.'
    },
    {
      name: 'Dr. Marie Lambert',
      role: 'Infirmière Coordinatrice',
      specialty: 'Soins Infirmiers',
      experience: '10 ans',
      image: 'assets/images/faces/face3.jpg',
      description: 'Coordination des soins à domicile et gestion du parcours patient.'
    },
    {
      name: 'Dr. Paul Bernard',
      role: 'Kinésithérapeute',
      specialty: 'Rééducation',
      experience: '8 ans',
      image: 'assets/images/faces/face4.jpg',
      description: 'Spécialiste en rééducation fonctionnelle et maintien à domicile.'
    }
  ];

  // Statistiques
  stats = [
    { value: '500+', label: 'Patients accompagnés', icon: 'fa-user-injured' },
    { value: '98%', label: 'Satisfaction patients', icon: 'fa-heart' },
    { value: '24/7', label: 'Disponibilité', icon: 'fa-clock' },
    { value: '50+', label: 'Professionnels', icon: 'fa-user-md' }
  ];

  // Valeurs
  values = [
    {
      title: 'Humanité',
      description: 'Nous plaçons le patient au centre de nos préoccupations avec écoute et empathie.',
      icon: 'fa-hand-holding-heart'
    },
    {
      title: 'Excellence',
      description: 'Des soins de qualité prodigués par des professionnels expérimentés.',
      icon: 'fa-award'
    },
    {
      title: 'Innovation',
      description: 'Utilisation des dernières technologies pour un suivi optimal.',
      icon: 'fa-laptop-medical'
    },
    {
      title: 'Accessibilité',
      description: 'Des soins accessibles à tous, partout et à tout moment.',
      icon: 'fa-home'
    }
  ];
}