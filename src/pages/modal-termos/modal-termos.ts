import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-termos',
  templateUrl: 'modal-termos.html',
})
export class ModalTermosPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
