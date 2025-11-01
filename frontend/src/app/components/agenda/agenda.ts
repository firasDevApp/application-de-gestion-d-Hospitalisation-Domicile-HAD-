import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda {
todayDate: string = ''; // Initialisation
  hours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  weekDays: any[] = [];
  
  events = [
    { day: "Lundi", title: "Visite patient", time: "09:00-10:00", color: "#3498db" },
    { day: "Lundi", title: "Pique-nique", time: "12:00-14:00", color: "#e74c3c" },
    { day: "Lundi", title: "Réunion", time: "18:00-20:00", color: "#2ecc71" },
    { day: "Mardi", title: "Soins", time: "10:00-11:00", color: "#9b59b6" },
    { day: "Mardi", title: "Ciné-débat", time: "18:00-20:00", color: "#f39c12" },
    { day: "Vendredi", title: "Atelier", time: "11:00-14:00", color: "#1abc9c" }
  ];

  constructor() {
    this.setTodayDate();
    this.generateWeekDays();
  }

  setTodayDate() {
    const today = new Date();
    this.todayDate = today.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  generateWeekDays() {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    
    this.weekDays = days.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        name: day,
        date: date
      };
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  getEventsForDayAndTime(day: string, time: string): any[] {
    return this.events.filter(event => {
      if (event.day === day) {
        const [eventStartTime] = event.time.split('-');
        return eventStartTime === time;
      }
      return false;
    });
  }
}
