import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  // 🔹 Pega o token automaticamente do localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // 🔹 Requisições sem autenticação
  get(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endpoint);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(this.baseUrl + endpoint, data);
  }

  // 🔹 Requisições com autenticação
  getWithToken(endpoint: string): Observable<any> {
    return this.http.get(this.baseUrl + endpoint, { headers: this.getAuthHeaders() });
  }

  putWithToken(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.baseUrl + endpoint, data, { headers: this.getAuthHeaders() });
  }

  deleteWithToken(endpoint: string): Observable<any> {
    return this.http.delete(this.baseUrl + endpoint, { headers: this.getAuthHeaders() });
  }

  postWithToken(endpoint: string, data: any): Observable<any> {
  const headers = this.getAuthHeaders();

  // Se for FormData, não define Content-Type (Angular faz automaticamente)
  if (data instanceof FormData) {
    return this.http.post(`${this.baseUrl}${endpoint}`, data, { headers });
  }

  // Para JSON
  return this.http.post(`${this.baseUrl}${endpoint}`, data, { headers: headers.set('Content-Type', 'application/json') });
}

}
