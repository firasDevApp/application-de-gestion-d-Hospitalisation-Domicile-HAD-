import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/admin/header/header';
import { Sidebar } from '../../components/admin/sidebar/sidebar';
import { Footer } from '../../components/admin/footer/footer';
import { Chatbot } from '../../components/chatbot/chatbot';
@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, Header, Sidebar, Footer, Chatbot],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  protected readonly title = signal('frontend');
}