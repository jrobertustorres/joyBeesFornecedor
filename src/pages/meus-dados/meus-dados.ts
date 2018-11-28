import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../app/constants';

//ENTITYS
import { FornecedorEntity } from './../../model/fornecedor-entity';

//PAGES
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

// SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';
import { LanguageTranslateService } from '../../providers/language-translate-service';

@IonicPage()
@Component({
  selector: 'page-meus-dados',
  templateUrl: 'meus-dados.html',
})
export class MeusDadosPage implements OnInit {

  public dadosFornecedorForm: FormGroup;
  private fornecedorEntity: FornecedorEntity;
  private loading = null;
  private loadingDados = null;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();
  public cpfPessoa: string;
  public telefonePessoa: string;

  public languageDictionary: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private fornecedorService: FornecedorService,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              private languageTranslateService: LanguageTranslateService,
              public modalCtrl: ModalController) {

    this.fornecedorEntity = new FornecedorEntity();
  }

  ngOnInit() {
    this.getTraducao();

    this.dadosFornecedorForm = this.formBuilder.group({
      'nome': ['', [Validators.required, Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'telefone': ['', [Validators.required, Validators.maxLength(50)]],
      'telefone2': [''],
      'site': ['', Validators.maxLength(50)]
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
        if(localStorage.getItem(Constants.TOKEN_USUARIO)) {
          this.callGetDadosFornecedor();
        }
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
      message: this.languageDictionary.TOAST_CADASTRO_ATUALIZADO,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  callGetDadosFornecedor() {
    try {
      this.loadingDados = this.loadingCtrl.create({
        content: this.languageDictionary.LOADING_TEXT,
      });
      this.loadingDados.present();

      this.fornecedorService
        .findDadosFornecedor()
        .then((fornecedorEntityResult) => {
          this.fornecedorEntity = fornecedorEntityResult;

          this.loadingDados.dismiss();
        })
        .catch(err => {
          this.loadingDados.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });
    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  submeterDadosFornecedor() {
    try {

      if (this.dadosFornecedorForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: this.languageDictionary.LOADING_TEXT,
        });
        this.loading.present();

        this.fornecedorService
        .editaDadosFornecedor(this.fornecedorEntity)
        .then((fornecedorEntityResult: FornecedorEntity) => {
          this.loading.dismiss();
          this.presentToast();
          setTimeout(() => {
            this.navCtrl.setRoot(ConfiguracoesPage);
          }, 2000);
        }, (err) => {
          this.loading.dismiss();
          this.alertCtrl.create({
            subTitle: err.message,
            buttons: ['OK']
          }).present();
        });

      } else {
        Object.keys(this.dadosFornecedorForm.controls).forEach(campo => {
          const controle = this.dadosFornecedorForm.get(campo);
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
