import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-user.html',
  styleUrls: ['./delete-user.css']
})
export class DeleteUser {
  @Input() user!: User;
  @Input() roles: Role[] = [];
  @Output() userDeleted = new EventEmitter<number>();
  @Output() modalFerme = new EventEmitter<void>();

  confirmerSuppression() {
    this.userDeleted.emit(this.user.id);
  }

  fermer() {
    this.modalFerme.emit();
  }

  getRoleLabel(type: string): string {
    const types: { [key: string]: string } = {
      'administrateur': 'Administrateur',
      'medecin': 'Médecin',
      'infirmier': 'Infirmier',
      'coordinateur': 'Coordinateur',
      'secretaire': 'Secrétaire'
    };
    return types[type] || type;
  }
}