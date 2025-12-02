import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Role {
  value: string;
  label: string;
}

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.html',
  styleUrls: ['./add-user.css']
})
export class AddUser {
  @Input() roles: Role[] = [];
  @Output() userAdded = new EventEmitter<any>();
  @Output() modalFerme = new EventEmitter<void>();

  demande = {
    nom: '',
    prenom: '',
    email: '',
    role: 'infirmier',
    telephone: '',
    status: 'actif'
  };

  typesStatus = [
    { value: 'actif', label: 'Actif' },
    { value: 'inactif', label: 'Inactif' }
  ];

  soumettreDemande() {
    if (this.formValide()) {
      this.userAdded.emit(this.demande);
      this.reinitialiserFormulaire();
    }
  }

  fermer() {
    this.modalFerme.emit();
    this.reinitialiserFormulaire();
  }

  formValide(): boolean {
    return !!this.demande.nom && 
           !!this.demande.prenom && 
           !!this.demande.email && 
           !!this.demande.telephone;
  }

  private reinitialiserFormulaire() {
    this.demande = {
      nom: '',
      prenom: '',
      email: '',
      role: 'infirmier',
      telephone: '',
      status: 'actif'
    };
  }
}