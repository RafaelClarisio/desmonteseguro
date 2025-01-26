import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() message: string = '';
  @Input() showConfirmButton: boolean = false;
  @Input() showCancelButton: boolean = false;
  @Input() showInput: boolean = false;
  @Input() showSubmitButton: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmAction = new EventEmitter<boolean>();
  @Output() inputAction = new EventEmitter<string>();
  inputValue: string = '';

  // Fechar o modal
  close() {
    this.closeModal.emit();
  }

  // Confirmar ação (Sim ou Não)
  confirm(confirm: boolean) {
    this.confirmAction.emit(confirm);
    this.close();
  }

  // Submeter input
  submitInput() {
    this.inputAction.emit(this.inputValue);
    this.close();
  }
}