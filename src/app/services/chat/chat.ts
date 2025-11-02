import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  apiUrl = 'https://emotional-support-chatbot-api-production.up.railway.app';

  constructor(private http: HttpClient, private router: Router) {}

  sendMessage(messageInfo: { message: string }): Observable<{ reply: string }> {
    return this.http
      .post<{ reply: string }>(`${this.apiUrl}/chat`, messageInfo)
      .pipe(catchError((error) => this.handleError(error)));
  }

  public handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.router.navigate(['auth', 'login']);
    }

    let errorMsg = 'An unknown error occurred!';

    if (error.error) {
      if (error.error.message) {
        errorMsg = error.error.message; // Primary message
      }
      if (error.error.details) {
        errorMsg += ` - ${error.error.details}`; // Additional details
      }
    }

    return throwError(() => new Error(errorMsg));
  }
}
