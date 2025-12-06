import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  contactInfo = [
    { icon: 'fa-phone', title: 'Téléphone', content: '+33 1 23 45 67 89' },
    { icon: 'fa-envelope', title: 'Email', content: 'contact@medicare.com' },
    { icon: 'fa-map-marker-alt', title: 'Adresse', content: '123 Rue de la Santé, 75015 Paris' },
    { icon: 'fa-clock', title: 'Horaires', content: 'Lun-Ven: 8h-20h' }
  ];

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  subjects = ['Prise de rendez-vous', 'Question médicale', 'Problème technique', 'Autre'];

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Réinitialiser le formulaire
    this.formData = { name: '', email: '', subject: '', message: '' };
    alert('Message envoyé avec succès !');
  }
}