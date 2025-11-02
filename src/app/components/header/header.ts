import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isSidebarOpen = false;
  username!: string | undefined;
  isAuthenticated!: boolean;

  constructor(private authService: Auth) {}

  ngOnInit() {
    this.username = this.authService.getUserInfo()?.username;
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
