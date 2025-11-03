import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat/chat';
import { Header } from '../header/header';
import { Auth } from '../../services/auth/auth';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  inputMessage = '';
  isTyping = false;
  errorMessage = '';
  username!: string | undefined;
  messages: Message[] = [];

  constructor(private chatService: ChatService, private authService: Auth) {}

  ngOnInit() {
    this.username = this.authService.getUserInfo()?.username;
    this.messages.push({
      id: 1,
      text: `Hello ${
        this.username ?? 'Friend'
      }! I'm here to listen, talk and support you. How are you feeling today?`,
      sender: 'bot',
      timestamp: new Date(),
    });
  }

  sendMessage() {
    if (!this.inputMessage.trim() || this.isTyping) return;

    const userMessageText = this.inputMessage.trim();

    // Add user message to chat
    const userMessage: Message = {
      id: this.messages.length + 1,
      text: userMessageText,
      sender: 'user',
      timestamp: new Date(),
    };
    this.messages.push(userMessage);

    // Clear input and show typing indicator
    this.inputMessage = '';
    this.isTyping = true;
    this.errorMessage = '';

    // Call API
    this.chatService.sendMessage({ message: userMessageText }).subscribe({
      next: (response: { reply: string }) => {
        this.isTyping = false;

        // Add bot response to chat
        const botMessage: Message = {
          id: this.messages.length + 1,
          text: response.reply,
          sender: 'bot',
          timestamp: new Date(),
        };
        this.messages.push(botMessage);

        // Scroll to bottom
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (error: HttpErrorResponse) => {
        this.isTyping = false;
        console.error('API Error:', error);

        this.errorMessage = 'Sorry, I had trouble connecting. Please try again.';

        // Clear error after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      },
    });
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  private scrollToBottom(): void {
    // You can implement auto-scroll here if needed
    // Example: this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
}
