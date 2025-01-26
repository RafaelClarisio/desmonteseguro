import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router) {}

  // Função de login (simulada com admin/admin)
  onLogin() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginError = false;
      this.router.navigate(['/home']);  // Navega para a página 'home'
    } else {
      this.loginError = true;
    }
  }







  
  // showModal: boolean = false;
  // modalMessage: string = '';

  // openModal() {
  //   this.modalMessage = 'Você tem certeza que deseja entrar?';
  //   this.showModal = true;
  // }

  // // Função para fechar o modal
  // onCloseModal() {
  //   this.showModal = false;
  // }

  // // Função para lidar com a confirmação do modal (Sim ou Não)
  // onConfirmAction(response: boolean) {
  //   if (response) {
  //     console.log('Usuário confirmou com "Sim"');
  //   } else {
  //     console.log('Usuário confirmou com "Não"');
  //   }
  //   this.onCloseModal(); // Fecha o modal após a resposta
  // }
}
