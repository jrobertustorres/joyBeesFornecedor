import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//ENTITYS
import { FornecedorEntity } from './../../model/fornecedor-entity';

//PAGES
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

// SERVICES
import { FornecedorService } from '../../providers/fornecedor-service';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private fornecedorService: FornecedorService,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              public modalCtrl: ModalController) {

    this.fornecedorEntity = new FornecedorEntity();
  }

  ngOnInit() {

    this.dadosFornecedorForm = this.formBuilder.group({
      'nome': ['', [Validators.required, Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'telefone': ['', Validators.maxLength(50)],
      'telefone2': ['', Validators.maxLength(50)],
      'site': ['', Validators.maxLength(50)]
    });

    this.callGetDadosFornecedor();
  }

  ionViewDidLoad() {
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Cadastro atualizado!',
      duration: 2000,
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
        content: 'Aguarde...',
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
          content: 'Aguarde...',
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
