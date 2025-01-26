import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/api/auth/login`;

  constructor(private http: HttpClient) {}

  login(usuario: string, senha: string): Observable<any> {
    return this.http.post(this.apiUrl, { usuario, senha });
  }


  generateAuthCode(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluindo o token no cabeçalho como Bearer
    });

    return this.http.post<any>(`${environment.apiUrl}/api/codauth/generate-auth-code`, {}, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('tokenCode', token);  // Armazena o token no localStorage
  }

  // Função para recuperar o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
