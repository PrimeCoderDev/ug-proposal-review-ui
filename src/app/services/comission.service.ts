import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class ComissionService {
  private apiUrl = `${environment.apiUrl}/comission`;

  constructor(private http: HttpClient) {}

  // Header Comission APIs
  createHeader(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.apiUrl}/header`, data);
  }

  findAllHeader(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/header`);
  }

  findOneHeader(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/header/${id}`);
  }

  updateHeader(id: string, data: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.apiUrl}/header/${id}`, data);
  }

  inactiveHeader(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.apiUrl}/header/${id}`);
  }

  // Detail Comission APIs
  createDetail(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.apiUrl}/detail`, data);
  }

  findOneDetail(idHeader: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/detail/${idHeader}`);
  }

  updateDetail(id: string, data: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.apiUrl}/detail/${id}`, data);
  }

  inactiveDetail(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.apiUrl}/detail/${id}`);
  }

  getTeachers(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/teacher`);
  }

  getReviewersByDocument(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${this.apiUrl}/members/${
        JSON.parse(localStorage.getItem('profile') ?? '')?.document || ''
      }`
    );
  }
}
