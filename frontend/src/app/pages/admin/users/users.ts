import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUser } from '../../../components/admin/modals/users/add-user/add-user';
import { EditUser } from '../../../components/admin/modals/users/edit-user/edit-user';
import { DeleteUser } from '../../../components/admin/modals/users/delete-user/delete-user';

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

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AddUser, EditUser, DeleteUser],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class Users {
  showModalAdd = false;
  showModalEdit = false;
  showModalDelete = false;
  
  selectedUser: User | null = null;
  
  roles = [
    { value: 'administrateur', label: 'Administrateur' },
    { value: 'medecin', label: 'Médecin' },
    { value: 'infirmier', label: 'Infirmier' },
    { value: 'coordinateur', label: 'Coordinateur' },
    { value: 'secretaire', label: 'Secrétaire' }
  ];
  
  users: User[] = [
    {
      id: 1,
      nom: 'Bernard',
      prenom: 'Sophie',
      email: 'sophie.bernard@had.fr',
      role: 'medecin',
      telephone: '06 12 34 56 78',
      status: 'actif',
      dateCreation: new Date('2023-01-15'),
      lastLogin: new Date('2023-11-10')
    },
    {
      id: 2,
      nom: 'Moreau',
      prenom: 'Pierre',
      email: 'pierre.moreau@had.fr',
      role: 'infirmier',
      telephone: '06 23 45 67 89',
      status: 'actif',
      dateCreation: new Date('2023-02-20'),
      lastLogin: new Date('2023-11-12')
    },
    {
      id: 3,
      nom: 'Petit',
      prenom: 'Alice',
      email: 'alice.petit@had.fr',
      role: 'infirmier',
      telephone: '06 34 56 78 90',
      status: 'actif',
      dateCreation: new Date('2023-03-10'),
      lastLogin: new Date('2023-11-11')
    },
    {
      id: 4,
      nom: 'Laurent',
      prenom: 'Marc',
      email: 'marc.laurent@had.fr',
      role: 'coordinateur',
      telephone: '06 45 67 89 01',
      status: 'inactif',
      dateCreation: new Date('2023-04-05'),
      lastLogin: new Date('2023-10-15')
    },
    {
      id: 5,
      nom: 'Dubois',
      prenom: 'Claire',
      email: 'claire.dubois@had.fr',
      role: 'secretaire',
      telephone: '06 56 78 90 12',
      status: 'actif',
      dateCreation: new Date('2023-05-18'),
      lastLogin: new Date('2023-11-13')
    }
  ];

  ouvrirModalAdd() {
    this.showModalAdd = true;
  }

  ouvrirModalEdit(user: User) {
    this.selectedUser = { ...user };
    this.showModalEdit = true;
  }

  ouvrirModalDelete(user: User) {
    this.selectedUser = user;
    this.showModalDelete = true;
  }

  fermerModalAdd() {
    this.showModalAdd = false;
  }

  fermerModalEdit() {
    this.showModalEdit = false;
    this.selectedUser = null;
  }

  fermerModalDelete() {
    this.showModalDelete = false;
    this.selectedUser = null;
  }

  onUserAdded(nouvelUser: any) {
    this.users.unshift({
      ...nouvelUser,
      id: this.getNextId(),
      dateCreation: new Date()
    });
    this.fermerModalAdd();
    
    console.log('Nouvel utilisateur ajouté:', nouvelUser);
  }

  onUserUpdated(userUpdate: any) {
    const index = this.users.findIndex(u => u.id === userUpdate.id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userUpdate };
      this.fermerModalEdit();
      console.log('Utilisateur mis à jour:', userUpdate);
    }
  }

  onUserDeleted(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
    this.fermerModalDelete();
    console.log('Utilisateur supprimé, ID:', userId);
  }

  private getNextId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
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

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'actif': return 'badge badge-gradient-success';
      case 'inactif': return 'badge badge-gradient-danger';
      default: return 'badge badge-gradient-secondary';
    }
  }

  getStatusLabel(statut: string): string {
    const statuts: { [key: string]: string } = {
      'actif': 'Actif',
      'inactif': 'Inactif'
    };
    return statuts[statut] || statut;
  }
}