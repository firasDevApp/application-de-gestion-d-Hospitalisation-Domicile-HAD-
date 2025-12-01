import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-statut-visit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-statut-visit.html',
  styleUrls: ['./modal-statut-visit.css']
})
export class ModalStatutVisit {
  @Input() visiteData: any;
  @Output() statutUpdated = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>();

  nouveauStatut: string = '';
  nouvelleDate: string = '';
  commentaire: string = '';
  showDateField: boolean = false;

  ngOnInit() {
    if (this.visiteData) {
      this.nouveauStatut = this.visiteData.statut;
      this.nouvelleDate = this.visiteData.date;
      this.updateDateFieldVisibility();
    }
  }

  onStatutChange() {
    this.updateDateFieldVisibility();
  }

  private updateDateFieldVisibility() {
    this.showDateField = this.nouveauStatut === 'REPORTÉ' ;
  }

  sauvegarder() {
    const updatedData = {
      ...this.visiteData,
      statut: this.nouveauStatut,
      date: this.nouvelleDate,
      commentaire: this.commentaire,
      dateModification: new Date().toISOString()
    };

    this.statutUpdated.emit(updatedData);
  }

  fermer() {
    this.modalClosed.emit();
  }
}