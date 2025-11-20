import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class Chatbot {
  isOpen = false;
  userMessage = '';
  messages: ChatMessage[] = [
    { sender: 'bot', text: '👋 Bonjour ! Comment puis-je vous aider aujourd’hui ?' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const message = this.userMessage.trim();
    if (!message) return;

    // Ajouter message utilisateur
    this.messages.push({ sender: 'user', text: message });
    this.userMessage = '';

    // Réponse automatique du bot (exemple simple)
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: "Merci pour votre message 😊 Je suis encore en apprentissage."
      });
    }, 600);
  }
}
