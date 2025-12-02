import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  telephone: string;
  status: 'actif' | 'inactif';
  dateCreation: Date;
  lastLogin?: Date;
}

interface Role {
  value: string;
  label: string;
}

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css']
})
export class EditUser {
  @Input() user!: User;
  @Input() roles: Role[] = [];
  @Output() userUpdated = new EventEmitter<any>();
  @Output() modalFerme = new EventEmitter<void>();

  userEdit: User;

  typesStatus = [
    { value: 'actif', label: 'Actif' },
    { value: 'inactif', label: 'Inactif' }
  ];

  constructor() {
    this.userEdit = {} as User;
  }

  ngOnChanges() {
    if (this.user) {
      this.userEdit = { ...this.user };
    }
  }

  soumettreModification() {
    if (this.formValide()) {
      this.userUpdated.emit(this.userEdit);
    }
  }

  fermer() {
    this.modalFerme.emit();
  }

  formValide(): boolean {
    return !!this.userEdit.nom && 
           !!this.userEdit.prenom && 
           !!this.userEdit.email && 
           !!this.userEdit.telephone;
  }
}