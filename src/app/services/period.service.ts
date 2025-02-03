import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  private apiUrl = `${environment.apiUrl}/period`;

  constructor(private http: HttpClient) {}

  create(periodData: any): Observable<IResponse> {
    return this.http.post<IResponse>(this.apiUrl, periodData);
  }

  findAll(): Observable<IResponse> {
    return this.http.get<IResponse>(this.apiUrl);
  }

  findOne(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/${id}`);
  }

  update(id: string, periodData: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.apiUrl}/${id}`, periodData);
  }

  remove(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.apiUrl}/${id}`);
  }
}
