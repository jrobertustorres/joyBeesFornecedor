import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import { Constants } from '../../app/constants';

//ENTITYS
import { UsuarioDetalheEntity } from './../../model/usuario-detalhe-entity';

//SERVICES
import { UsuarioService } from '../../providers/usuario-service';
import { EstadosService } from '../../providers/estados-service';
import { CidadesService } from '../../providers/cidades-service';

//PAGES
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@IonicPage()
@Component({
  selector: 'page-meu-endereco',
  templateUrl: 'meu-endereco.html',
})
export class MeuEnderecoPage {
  public enderecoUsuarioForm: FormGroup;
  private loading = null;
  private usuarioDetalheEntity: UsuarioDetalheEntity;
  private estados = [];
  private cidades = [];
  private loadingDados = null;
  private loadingCidades = null;
  tabBarElement: any;

  constructor(public navCtrl: NavController, 
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              private usuarioService: UsuarioService,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private estadosService: EstadosService, 
              private cidadesService: CidadesService, 
              public navParams: NavParams) {
    this.usuarioDetalheEntity = new UsuarioDetalheEntity();
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');

  }

  ngOnInit() {
    this.callGetEnderecoUsuario();
    this.enderecoUsuarioForm = this.formBuilder.group({
      'endereco': ['', [Validators.required, Validators.maxLength(300)]],
      'idEstado': ['', Validators.required],
      'idCidade': ['', Validators.required],
    });

    this.estadosService
      .getEstados()
      .subscribe(dados => {
      this.estados = dados;
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Seu endereço foi alterado!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  getCidadesByEstadoUsuario(idEstado) {
    try {
      this.loadingCidades = this.loadingCtrl.create({
        content: 'Buscando cidades...'
      });
      this.loadingCidades.present();

      this.cidadesService
        .getCidades(idEstado)
        .then((listCidadesResult) => {
          this.cidades = listCidadesResult;
          this.loadingCidades.dismiss();
        })
        .catch(err => {
          this.loadingCidades.dismiss();
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

  callGetEnderecoUsuario() {
    try {
      this.loadingDados = this.loadingCtrl.create({
        content: 'Aguarde...',
        // dismissOnPageChange: true
      });
      this.loadingDados.present();

      this.usuarioService
        .getDadosUsuario()
        .then((dadosUsuarioDetalheResult) => {
          this.usuarioDetalheEntity = dadosUsuarioDetalheResult;
          console.log(this.usuarioDetalheEntity);

          this.loadingDados.dismiss();
          this.getCidadesByEstadoUsuario(dadosUsuarioDetalheResult.idEstado);
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


  submeterEnderecoUsuario() {
    try {

      if (this.enderecoUsuarioForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();

        console.log(this.usuarioDetalheEntity);

          this.usuarioService
          .atualizaUsuario(this.usuarioDetalheEntity)
          .then((usuarioDetalheEntityResult: UsuarioDetalheEntity) => {
      
            this.loading.dismiss();
            this.presentToast();
            setTimeout(() => {
              this.navCtrl.setRoot(ConfiguracoesPage);
            }, 3000);
          }, (err) => {
            this.loading.dismiss();
            this.alertCtrl.create({
              subTitle: err.message,
              buttons: ['OK']
            }).present();
          });
        
      } else {
        Object.keys(this.enderecoUsuarioForm.controls).forEach(campo => {
          const controle = this.enderecoUsuarioForm.get(campo);
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
