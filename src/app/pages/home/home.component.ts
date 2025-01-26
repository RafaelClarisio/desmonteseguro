import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showModal: boolean = false;  // Modal com input e botões
  showModalCloseOnly: boolean = false;  // Modal apenas com botão Fechar
  showModalConfirm: boolean = false;  // Modal de confirmação
  showModalCloseOnlyAlert: boolean = false
  showModalConfirmStop: boolean = false;
  showModalInputStop: boolean = false;
  alerta: boolean = true;

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
}