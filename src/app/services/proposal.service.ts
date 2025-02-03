import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private apiUrl = `${environment.apiUrl}/proposal`;

  constructor(private http: HttpClient) {}

  findAll(periodId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/header/${periodId}`);
  }

  update(id: string, data: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.apiUrl}/header/${id}`, data);
  }

  findDetail(headerId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/detail/${headerId}`);
  }

  updateDetail(id: string, data: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.apiUrl}/detail/${id}`, data);
  }

  findAllFile(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/file`);
  }

  processFile(data: any): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.apiUrl}/file`, data);
  }

  findPartner(document: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.apiUrl}/partner/${document}`);
  }
}
