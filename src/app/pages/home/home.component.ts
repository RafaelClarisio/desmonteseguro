import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from '../../services/login.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  showModal: boolean = false;  // Modal com input e botões
  showModalCloseOnly: boolean = false;  // Modal apenas com botão Fechar
  showModalConfirm: boolean = false;  // Modal de confirmação
  showModalCloseOnlyAlert: boolean = false
  showModalConfirmStop: boolean = false;
  showModalInputStop: boolean = false;
  alerta: boolean = false;
  isAdmin: boolean = false; // Variável que armazena o status do usuário
  token: string | null = ''; // Variável para armazenar o token
  authCode: string = '';  // Variável para armazenar o código de autenticação
  

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole(); // Verifica o papel do usuário quando o componente inicializa
  }
  checkUserRole() {
    this.token = localStorage.getItem('token');  // Recupera o token do localStorage
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token); // Decodifica o token
      // console.log(decodedToken)
      if (decodedToken?.usuario === 'admin') {
        this.isAdmin = true;  // Se o usuário for admin, definimos a variável isAdmin como true
      }
    }
  }

  // Abrir o modal de confirmação
  showConfirmModal() {
    this.showModal = false;
    this.showModalCloseOnly = true;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  showConfirmModalAlert() {
    this.showModal = false;
    this.showModalCloseOnly = false;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = true;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  // Abrir o modal de autenticação após a confirmação
  showAcceptModal() {
    this.showModalConfirm = true;  // Fechar o modal de confirmação
    this.showModal = false;  // Abrir o modal de autenticação
    this.showModalCloseOnly = false;  // Garantir que o outro modal não está aberto
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  showAcceptModalStop() {
    this.showModalConfirm = false;  // Fechar o modal de confirmação
    this.showModal = false;  // Abrir o modal de autenticação
    this.showModalCloseOnly = false;  // Garantir que o outro modal não está aberto
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = true;
    this.showModalInputStop = false
  }

  onCloseConfirmModalStop() {
    this.showModalConfirmStop = false;
  }

  onAcceptActionStop(confirmed: boolean) {
    this.showModal = false;
    this.showModalCloseOnly = false;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = true;
  }

  // Abrir o modal de autenticação (com input)
  showAuthModal() {
    this.showModal = true;
    this.showModalCloseOnly = false;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  // Fechar o modal
  onCloseModal() {
    this.showModal = false;
    this.showModalCloseOnly = false;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  onCloseConfirmModal() {
    this.showModalConfirm = false;
  }

  // Lidar com a ação de confirmação (Sim ou Não) no modal de alerta
  onConfirmActionStart(inputValue: string) {
    console.log("Alerta Iniciado",this.alerta)
    this.alerta = true;
    this.showModal = false;  // Fechar o modal
  }
  onConfirmActionStop(inputValue: string) {
    this.alerta = false;
    console.log("Alerta removido",this.alerta)
    this.showModal = false;  // Fechar o modal
  }

  // Lidar com a ação de aceitação (Confirmar alerta) e abrir modal de autenticação
  onAcceptAction(confirmed: boolean) {
    this.showModal = true;
    this.showModalCloseOnly = false;
    this.showModalConfirm = false;
    this.showModalCloseOnlyAlert = false;
    this.showModalConfirmStop = false;
    this.showModalInputStop = false
  }

  // Lidar com o envio do input no modal de autenticação
  onInputSubmit(inputValue: string) {
    console.log('Input Recebido: ', inputValue);
    this.showModal = false; // Fechar o modal
  }

  generateAuthCode() {
    // Pegando o token armazenado no localStorage
    const token = this.loginService.getToken();
  
    // Verificando se o token existe
    if (!token) {
      console.error('Token não encontrado no localStorage');
      this.router.navigate(['/']); // Redireciona para o login
      return;
    }
  
    // Chamando o serviço para gerar o código de autenticação
    this.loginService.generateAuthCode(token).subscribe(
      (response) => {
        console.log('Token gerado com sucesso:', response);
        this.token = response.token;  // Atualiza a variável de token
        this.authCode = response.codigo;  // Atribui o código gerado à variável
        this.checkUserRole();  // Verifica a role do usuário novamente
      },
      (error) => {
        console.error('Erro ao gerar o token:', error);
      }
    );
}
}