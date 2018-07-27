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

@Component({
  template: '<ion-nav #baseNav></ion-nav>'
})

export class MyApp {
  @ViewChild('baseNav') nav: Nav;
  rootPage:any;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public alertCtrl: AlertController,
              public push: Push,
              private network: Network,
              private appVersion: AppVersion,
              public menuCtrl: MenuController) {

    this.initializeApp();

  }

  ngOnInit() {
    this.nav.push(MenuPage, { animate: false });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.appVersion.getVersionNumber().then((version) => {
          localStorage.setItem(Constants.VERSION_NUMBER, version);
        })
      }
      this.statusBar.styleDefault();
      this.initPushNotification();
      this.splashScreen.hide();
      // aqui checamos a conexão ao entrar no app
      this.checkNetwork();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.network.onDisconnect().subscribe(() => {
        this.checkNetwork();
        // disconnectSubscription.unsubscribe();
      });
    });
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
        console.log('Push notification clicked');
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
