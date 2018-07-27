import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-politica',
  templateUrl: 'modal-politica-privacidade.html'
})
export class ModalPoliticaPrivacidadePage {
  constructor(public viewCtrl: ViewController) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
