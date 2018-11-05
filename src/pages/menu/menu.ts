import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform } from 'ionic-angular';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';
import { VersaoAppEntity } from '../../model/versao-app-entity';

//PAGES
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

//SERVICES
import { LoginService } from '../../providers/login-service';
import { UsuarioService } from '../../providers/usuario-service';
import { VersaoAppService } from '../../providers/versao-app-service';
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{
  @ViewChild('content') nav: Nav;
  rootPage:any;
  public nomePessoa: string;
  public emailPessoa: string;
  public qtdTicketFornecedor: string;
  pages: Array<{title: string, component: any, isVisible: boolean, icon: string}>;

  private usuarioEntity: UsuarioEntity;
  private loading = null;
  private versaoAppEntity: VersaoAppEntity;
  private versao: any;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              public loginService: LoginService,
              public cockpitCotacaoService: CockpitCotacaoService,
              public usuarioService: UsuarioService,
              private versaoAppService: VersaoAppService,
              public platform: Platform) {

      this.usuarioEntity = new UsuarioEntity();
      this.versaoAppEntity = new VersaoAppEntity();

  }

  ngOnInit() {
    try {

      this.constroiMenu();
      if(!localStorage.getItem(Constants.ID_USUARIO)){
        this.rootPage = LoginPage;
      }
      else if(localStorage.getItem(Constants.ID_USUARIO)) {
        this.getAtualizacaoStatus();
        // this.callLoginByIdService(localStorage.getItem(Constants.ID_USUARIO));
      }
    } catch (err){
    }
  }

  ionViewDidLoad() {
  }  

  getAtualizacaoStatus() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Autenticando...',
      });
      this.loading.present();

      this.versaoAppEntity.versao = localStorage.getItem(Constants.VERSION_NUMBER);
      this.versaoAppEntity.tipoAplicativoEnum = 'FORNECEDOR_SERVICOS';

      this.versaoAppService.versaoApp(this.versaoAppEntity)
      .then((versaoResult: VersaoAppEntity) => {
        this.versao = versaoResult;

        if(this.versao.descontinuado == true) {
          this.showAlertVersao(this.versao);
        } else {
          this.verificaIdUsuario();
        }

      }, (err) => {
        this.loading.dismiss();
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

  showAlertVersao(versao) {
    const alert = this.alertCtrl.create({
      title: 'Atualização do aplicativo',
      subTitle: 'A versão que você está usando foi descontinuada. É necessário atualizar para continuar usando o app.',
      buttons: [
        {
        text: 'OK',
          handler: () => {
            this.getPlatform(versao);
          }
      }]
    });
    alert.present();
  }

  getPlatform(versao) {
    if (this.platform.is('ios')) {
      window.open(versao.linkIos, '_system', 'location=yes');
      this.platform.exitApp();
    }

    if (this.platform.is('android')) {
      window.open(versao.linkAndroid, '_system', 'location=yes');
      this.platform.exitApp();
    }

  }

  verificaIdUsuario() {
    if(!localStorage.getItem(Constants.ID_USUARIO)){
      this.rootPage = HomePage;
    }
    else if(localStorage.getItem(Constants.ID_USUARIO)) {
      this.callLoginByIdService(localStorage.getItem(Constants.ID_USUARIO));
    }
  }

  constroiMenu() {

    this.pages = [
      { title: 'Orçamentos', component: HomePage, isVisible: true, icon: 'ios-copy' },
      { title: 'Configurações', component: ConfiguracoesPage, isVisible: true, icon: 'ios-settings' },
    ];

    this.usuarioService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.usuarioService.emailPessoaChangeEvent.subscribe(email => {
      this.emailPessoa = email;
    });
    this.loginService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.loginService.emailPessoaChangeEvent.subscribe(email => {
      this.emailPessoa = email;
    });
    this.loginService.qtdTicketChangeEvent.subscribe(qtdTicketFornecedor => {
      this.qtdTicketFornecedor = qtdTicketFornecedor;
    });
    this.cockpitCotacaoService.qtdTicketChangeEvent.subscribe(qtdTicketFornecedor => {
      this.qtdTicketFornecedor = qtdTicketFornecedor;
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  callLoginByIdService(idUsuario) {

    try {

      this.usuarioEntity.idUsuario = idUsuario;
      this.loginService.loginByIdFornecedorServicos(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
          // this.constroiMenu();
          this.loading.dismiss();
          this.rootPage = HomePage;

        }, (err) => {
          this.loading.dismiss();
          err.message = err.message ? err.message : 'Não foi possível conectar ao servidor';
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: [{
            text: 'OK',
            handler: () => {
              this.logout();
            }
          }]
          // buttons: ['OK']
        }).present();
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }

  }

  logout() {
    localStorage.removeItem(Constants.ID_USUARIO);
    localStorage.removeItem(Constants.TOKEN_USUARIO);
    localStorage.removeItem(Constants.NOME_PESSOA);
    this.nav.setRoot(LoginPage);
    this.menuCtrl.close();
  }

  confirmaLogout() {
    let alert = this.alertCtrl.create({
      subTitle: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Ficar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            localStorage.removeItem(Constants.ID_USUARIO);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            localStorage.removeItem(Constants.TOKEN_PUSH);
            localStorage.removeItem(Constants.NOME_PESSOA);
            localStorage.removeItem(Constants.EMAIL_PESSOA);
            localStorage.removeItem(Constants.QTD_TICKET_FORNECEDOR);
            this.nav.setRoot(LoginPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    alert.present();
  }

}
