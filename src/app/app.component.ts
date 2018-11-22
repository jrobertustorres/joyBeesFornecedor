import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Constants } from '../app/constants';
import { Network } from '@ionic-native/network';

//PAGES
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from './../pages/home/home';

//I18N
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage, availableLanguages, sysOptions } from '../pages/i18n/i18n-constants';
import { LanguageTranslateService } from '../providers/language-translate-service';
import { Globalization } from '@ionic-native/globalization';

@Component({
  template: '<ion-nav #baseNav></ion-nav>'
})

export class MyApp {
  @ViewChild('baseNav') nav: Nav;
  rootPage:any;
  private translate: TranslateService;
  private titleConection: string;
  private subTitleConection: string;
  public languageDictionary: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public push: Push,
              private network: Network,
              private appVersion: AppVersion,
              translate: TranslateService,
              private globalization: Globalization,
              private languageTranslateService: LanguageTranslateService,
              public menuCtrl: MenuController) {

    this.initializeApp();

    this.translate = translate;

  }

  ngOnInit() {
    this.nav.push(MenuPage, { animate: false });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(()=>this.myHandlerFunction());
      // this.getLanguegeDefault();

      if (this.platform.is('cordova')) {
        this.appVersion.getVersionNumber().then((version) => {
          localStorage.setItem(Constants.VERSION_NUMBER, version);
        })
      }
      this.statusBar.styleDefault();
      this.initPushNotification();
      this.splashScreen.hide();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      this.network.onDisconnect().subscribe(() => {
        let alertDisconect = this.alertCtrl.create({
          title: this.languageDictionary.TITLE_CONECTION,
          subTitle: this.languageDictionary.SUBTITLE_CONECTION,
          buttons: [{
             text: 'Ok',
             handler: () => {
                 this.platform.exitApp();
                }
             }]
           });
           alertDisconect.present();
      });
    });
  }

  myHandlerFunction(){
    //desabilitando o botão de voltar do android
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
        // aqui checamos a conexão ao entrar no app
        this.checkNetwork();
        this.nav.push(MenuPage, { animate: false });
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  //OBTENDO O IDIOMA CONFIGURADO NO APARELHO
  getLanguegeDefault() {
    if ((<any>window).cordova) {
      this.globalization.getPreferredLanguage().then(result => {
        let idioma = result.value == 'pt-BR' ? 'pt-br' : 'en';
        localStorage.setItem(Constants.IDIOMA_USUARIO, idioma);
        this.getTraducao();
      });
    }
    else {
      let browserLanguage = this.translate.getBrowserLang() || defaultLanguage;
      browserLanguage = browserLanguage == 'pt' ? 'pt-br' : 'en';
      localStorage.setItem(Constants.IDIOMA_USUARIO, browserLanguage);
      this.getTraducao();
    }

  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '665263696484',
        sound   : 'true',
        vibrate : true
        // icon    : 'icon'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      localStorage.setItem(Constants.TOKEN_PUSH, data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
      if (data.additionalData.foreground) {
        let confirmAlert = this.alertCtrl.create({
          title: 'Nova notificação',
          message: data.message,
          buttons: [{
            text: 'IGNORAR',
            role: 'cancel'
          }, {
            text: 'VER',
            handler: () => {
              this.nav.push(HomePage);
            }
          }]
        });
        confirmAlert.present();
      } else {
        this.nav.push(HomePage);
        //console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }

  checkNetwork() {

      if(this.network.type === 'none') {
        let alert = this.alertCtrl.create({
        title: 'Você está offline',
        subTitle: 'Verifique a conexão de sua internet e tente novamente!',
        buttons: [{
          text: 'Ok',
          handler: () => {
              this.platform.exitApp();
              }
          }]
        });
      alert.present();
      }
  }


}
