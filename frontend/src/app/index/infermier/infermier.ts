import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/infermier/header/header';
import { Sidebar } from '../../components/infermier/sidebar/sidebar';
import { Footer } from '../../components/infermier/footer/footer';
import { Chatbot } from '../../components/chatbot/chatbot';
@Component({
  selector: 'app-infermier',
  imports: [RouterOutlet, Header, Sidebar, Footer, Chatbot],
  templateUrl: './infermier.html',
  styleUrl: './infermier.css'
})
export class Infermier {
  protected readonly title = signal('frontend');
}