import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  onLogin() {
    this.loginService.login(this.usuario, this.senha).subscribe(
      (response) => {
        // Sucesso no login
        // console.log(response.token, "Login realizado")
        localStorage.setItem('token', response.token); // Armazene o token no localStorage
        this.router.navigate(['/home']);
      },
      (error) => {
        // Falha no login
        this.loginError = true;
      }
    );
  }
}
