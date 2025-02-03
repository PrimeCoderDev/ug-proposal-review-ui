import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) {}

  getMenus(): Observable<IResponse> {
    return this.http.get<IResponse>(this.apiUrl, {
      headers: {
        Authorization: `${sessionStorage.getItem('token')}`,
      },
    });
  }
}
