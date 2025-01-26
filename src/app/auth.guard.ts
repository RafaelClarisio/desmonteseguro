import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decodifica o token JWT
        const decodedToken: any = jwtDecode(token);
        
        // Verifica se o token está expirado
        const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
        if (decodedToken.exp < currentTime) {
          // Se o token expirou, remove o token e redireciona para a página de login
          localStorage.removeItem('token');
          this.router.navigate(['/']); // Redireciona para o login
          return false;
        }

        return true; // O token é válido, o acesso é permitido
      } catch (error) {
        // Se ocorrer um erro ao decodificar o token, remove o token e redireciona para o login
        localStorage.removeItem('token');
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // Se não houver token, redireciona para o login
      this.router.navigate(['/']);
      return false;
    }
  }
}
