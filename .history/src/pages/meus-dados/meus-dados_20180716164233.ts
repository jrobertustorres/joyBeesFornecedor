import { Component, OnInit, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
// import {MaskUtil} from "../../utilitarios/mask";

//UTILITARIOS
// import { PasswordValidation } from '../../utilitarios/password-validation';

//ENTITYS
// import { UsuarioEntity } from './../../model/usuario-entity';
// import { UsuarioDetalheEntity } from '../../model/fornecedor-entity';
import { FornecedorEntity } from './../../model/fornecedor-entity';

//PAGES
// import { HomePage } from '../home/home';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

// SERVICES
import { UsuarioService } from '../../providers/usuario-service';

@IonicPage()
@Component({
  selector: 'page-meus-dados',
  templateUrl: 'meus-dados.html',
})
export class MeusDadosPage implements OnInit {

  public dadosUsuarioForm: FormGroup;
  private fornecedorEntity: FornecedorEntity;
  // private usuarioEntity: UsuarioEntity;
  private loading = null;
  private loadingDados = null;
  private isReadOnly = null;
  private idUsuarioLogado = null;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();
  public cpfPessoa: string;
  public telefonePessoa: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private usuarioService: UsuarioService,
              private formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              // private mask: MaskUtil,
              public modalCtrl: ModalController) {

    this.fornecedorEntity = new FornecedorEntity();
    // this.usuarioEntity = new UsuarioEntity();
  }

  ngOnInit() {

    this.dadosUsuarioForm = this.formBuilder.group({
      'nomePessoa': ['', [Validators.required, Validators.maxLength(100)]],
      'emailUsuario': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'telefonePessoa': ['', Validators.maxLength(50)],
      'telefonePessoa2': ['', Validators.maxLength(50)]
    });

    // this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);
    // if(!localStorage.getItem(Constants.ID_USUARIO)){
    //   this.isReadOnly = false;
    //   this.dadosUsuarioForm.get('senhaUsuario').setValidators([Validators.required]);
    // } else if(localStorage.getItem(Constants.ID_USUARIO)) {
    //   this.isReadOnly = true;
    //   this.callGetDadosUsuario();
    // }
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

  submeterDadosFornecedor() {
    try {

      if (this.dadosUsuarioForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();

        this.usuarioService
        .atualizaUsuario(this.fornecedorEntity)
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
        Object.keys(this.dadosUsuarioForm.controls).forEach(campo => {
          const controle = this.dadosUsuarioForm.get(campo);
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

  callGetDadosFornecedor() {
    try {
      this.loadingDados = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loadingDados.present();

      this.usuarioService
        .findDadosFornecedor()
        .then((fornecedorEntityResult) => {
          this.fornecedorEntity = fornecedorEntityResult;

          // this.getCampoCpf(this.usuarioDetalheEntity.cpfPessoa);
          // this.getCampoTelefone(this.usuarioDetalheEntity.telefonePessoa);

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

}
