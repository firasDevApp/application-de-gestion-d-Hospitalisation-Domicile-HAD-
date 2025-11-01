import { Component } from '@angular/core';
import  { Agenda } from '../../components/agenda/agenda';
@Component({
  selector: 'app-dashboard',
  imports: [Agenda], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
}