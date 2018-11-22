import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//ENTITYS
import { UsuarioEntity } from '../../model/usuario-entity';

//SERVICES
import { UsuarioService } from '../../providers/usuario-service';
import { LanguageTranslateService } from '../../providers/language-translate-service';

//PAGES
import { LoginPage } from './../login/login';

// @IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})

export class RecuperarSenhaPage implements OnInit {

  private loading: any;
  private usuarioEntity: UsuarioEntity;
  public recuperarSenhaForm: FormGroup;
  public languageDictionary: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              public alertCtrl: AlertController,
              private languageTranslateService: LanguageTranslateService,
              private toastCtrl: ToastController) {

    this.usuarioEntity = new UsuarioEntity();

  }

  ngOnInit() {
    this.getTraducao();
    this.recuperarSenhaForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    });
  }

  ionViewDidLoad() {
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.languageDictionary.TOAST_RECUPERAR_SENHA,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  submeterRecuperarSenha() {
    try {
      if (this.recuperarSenhaForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: this.languageDictionary.LOADING_TEXT,
        });
        this.loading.present();

        this.usuarioService
        .recuperasenhaService(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
    
          this.loading.dismiss();
          this.presentToast();
          setTimeout(() => {
            this.navCtrl.push(LoginPage);
          }, 3000);
        }, (err) => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });

        
      } else {
        Object.keys(this.recuperarSenhaForm.controls).forEach(campo => {
          const controle = this.recuperarSenhaForm.get(campo);
          controle.markAsTouched();
        })
      }
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }


}
