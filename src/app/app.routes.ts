import { Routes } from '@angular/router';
import { Chat } from './components/chat/chat';
import { Splash } from './components/splash/splash';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login';
import { authGuard } from './services/guards/auth-guard';
import { Notfound } from './components/notfound/notfound';
import { About } from './components/about/about';

export const routes: Routes = [
  { path: '', component: Splash },
  { path: 'chat', component: Chat, canActivate: [authGuard] },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'about', component: About },

  { path: '**', component: Notfound },
];
