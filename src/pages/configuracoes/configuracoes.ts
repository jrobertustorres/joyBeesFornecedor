import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Constants } from '../../app/constants';

// PAGES
import { ModalTermosPage } from '../modal-termos/modal-termos';
import { ModalPoliticaPrivacidadePage } from '../modal-politica-privacidade/modal-politica-privacidade';
import { MeusDadosPage } from '../meus-dados/meus-dados';
import { MinhaSenhaPage } from './../minha-senha/minha-senha';

//PROVIDERS
import { LanguageProvider } from '../../providers/language-provider';

//I18N
import { TranslateService } from '@ngx-translate/core';
import { availableLanguages, sysOptions } from '../i18n/i18n-constants';

//SERVICES
import { LanguageTranslateService } from '../../providers/language-translate-service';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage implements OnInit {
  public languageChangeEvent = new EventEmitter();
  languages = availableLanguages;
  selectedLanguage: any;
  private translate: TranslateService;
  public languageDictionary: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              private languageProvider: LanguageProvider,
              private languageTranslateService: LanguageTranslateService,
              translate: TranslateService,
              public alertCtrl: AlertController) {

    this.translate = translate;

  }

  ngOnInit() {
    this.getTraducao();
  }

  ionViewDidLoad() {
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
        this.selectedLanguage = localStorage.getItem(Constants.IDIOMA_USUARIO);
        
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  applyLanguage() {
    localStorage.setItem(Constants.IDIOMA_USUARIO, this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.languageProvider.getLanguageProvider(this.selectedLanguage);
  }

  openModalTermos(){
    window.open('http://joybees.com/terms.html', '_system', 'location=yes'); return false;
    // let modal = this.modalCtrl.create(ModalTermosPage);
    // modal.present();
  }

  openModalPolitica(){
    window.open('http://joybees.com/privacy.html', '_system', 'location=yes'); return false;
    // let modal = this.modalCtrl.create(ModalPoliticaPrivacidadePage);
    // modal.present();
  }

  meusDados() {
    this.navCtrl.push(MeusDadosPage);
  }

  minhaSenha() {
    this.navCtrl.push(MinhaSenhaPage);
  }

}
