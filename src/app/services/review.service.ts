import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/app/environments/environment';
import { IResponse } from '@/app/types/IResponse';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/review`;

  constructor(private http: HttpClient) {}

  create(reviewData: any): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}`, reviewData);
  }

  findAll(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}`);
  }

  findOne(id: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/${id}`);
  }

  update(id: string, updateData: any): Observable<IResponse> {
    return this.http.patch<IResponse>(`${this.baseUrl}/${id}`, updateData);
  }

  remove(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.baseUrl}/${id}`);
  }

  getReviewsByMember(memberId: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/member/${memberId}`);
  }

  getReviewsByDocument(): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${this.baseUrl}/member/reviews/${
        JSON.parse(localStorage.getItem('profile') ?? '')?.document || ''
      }`
    );
  }
}
