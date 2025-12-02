import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-planning',
  templateUrl: './planning.html',
  styleUrls: ['./planning.css']
})
export class AdminPlanning implements AfterViewInit {

  map: any;
  visits = [
    { id: 1, lat: 36.5018, lng: 8.7804, type: 'urgent', title: 'Hôpital Régional', patient: 'Jean Martin', motif: 'Douleurs thoraciques', medecin: 'Dr. Sophie Bernard', time: '08:30 - 09:15' },
    { id: 2, lat: 36.5080, lng: 8.7850, type: 'control', title: 'Cité Sportive', patient: 'Marie Curie', motif: 'Contrôle tension artérielle', medecin: 'Pierre Moreau', time: '09:30 - 10:00' },
    { id: 3, lat: 36.5050, lng: 8.7750, type: 'vaccination', title: 'Souk-el Arba', patient: 'Robert Durand', motif: 'Vaccin grippe saisonnière', medecin: 'Alice Petit', time: '10:15 - 10:45' },
    { id: 4, lat: 36.5020, lng: 8.7900, type: 'consultation', title: 'Rond-Point AlHamama', patient: 'Claire Dubois', motif: 'Suivi diabète', medecin: 'Dr. Marc Laurent', time: '11:00 - 11:45' },
    { id: 5, lat: 36.4980, lng: 8.7830, type: 'urgent', title: 'Zone Résidentielle P17', patient: 'Paul Lefevre', motif: 'Chute accidentelle', medecin: 'Dr. Sophie Bernard', time: '13:30 - 14:15' }
  ];

  async ngAfterViewInit() {
  if (typeof window !== 'undefined') {
    const L = await import('leaflet');

    // Initialiser la carte
    this.map = L.map('map').setView([36.503, 8.783], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajouter markers et popups
    this.visits.forEach(v => {
      const marker = L.marker([v.lat, v.lng]).addTo(this.map);
      marker.bindPopup(`
        <b>${v.title}</b><br>
        Patient: ${v.patient}<br>
        Motif: ${v.motif}<br>
        Médecin: ${v.medecin}<br>
        Horaire: ${v.time}
      `);
      (v as any).marker = marker;
    });

    // Tracer le parcours
    const latlngs: L.LatLngExpression[] = this.visits.map(v => ({ lat: v.lat, lng: v.lng }));
    L.polyline(latlngs, { color: '#667eea', weight: 5 }).addTo(this.map);

    // Hover sur visite -> ouvrir popup et recentrer la carte
    const visitCards = document.querySelectorAll<HTMLElement>('.visit-card');

    visitCards.forEach(card => {
      const id = parseInt(card.getAttribute('data-visit')!);
      const visit = this.visits.find(v => v.id === id);

      if (!visit) return;

      card.addEventListener('mouseenter', () => {
        const marker = (visit as any).marker;
        if (marker) {
          marker.openPopup();
          this.map.setView([visit.lat, visit.lng], 15, { animate: true });
        }
        card.classList.add('highlight');
      });

      card.addEventListener('mouseleave', () => {
        const marker = (visit as any).marker;
        if (marker) {
          marker.closePopup();
        }
        card.classList.remove('highlight');
      });
    });
  }
}

}
