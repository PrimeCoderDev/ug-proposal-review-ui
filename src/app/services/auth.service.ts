import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, credentials);
  }
}
