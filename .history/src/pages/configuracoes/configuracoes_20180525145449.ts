import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';

// PAGES
import { ModalTermosPage } from '../modal-termos/modal-termos';
import { ModalPoliticaPrivacidadePage } from '../modal-politica-privacidade/modal-politica-privacidade';
// import { MeusDadosPage } from '../meus-dados/meus-dados';
import { MinhaSenhaPage } from './../minha-senha/minha-senha';

// @IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage implements OnInit {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {

  }

  ngOnInit() {
  }

  ionViewDidLoad() {
  }

  openModalTermos(){
    let modal = this.modalCtrl.create(ModalTermosPage);
    modal.present();
  }

  openModalPolitica(){
    let modal = this.modalCtrl.create(ModalPoliticaPrivacidadePage);
    modal.present();
  }

  // meusDados() {
  //   this.navCtrl.push(MeusDadosPage);
  // }

  minhaSenha() {
    this.navCtrl.push(MinhaSenhaPage);
  }

  // meusDados() {
  //   this.navCtrl.push(MeusDadosPage);
  // }

}
