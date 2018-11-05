import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform } from 'ionic-angular';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//PAGES
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

//SERVICES
import { LoginService } from '../../providers/login-service';
import { UsuarioService } from '../../providers/usuario-service';

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

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              public loginService: LoginService,
              public usuarioService: UsuarioService,
              public platform: Platform) {

      this.usuarioEntity = new UsuarioEntity();

      try {

          if(!localStorage.getItem(Constants.ID_USUARIO)){
            this.rootPage = LoginPage;
          }
          else if(localStorage.getItem(Constants.ID_USUARIO)) {
            this.callLoginByIdService(localStorage.getItem(Constants.ID_USUARIO));
          }
      } catch (err){
        // this.trataExcessao(null);
      }
  }

  ngOnInit() {
    this.constroiMenu();
    // this.qtdTicketFornecedor = localStorage.getItem(Constants.QTD_TICKET_FORNECEDOR);

    // console.log(this.qtdTicketFornecedor);

    // console.log('dentro do menu');
  }

  ionViewDidLoad() {
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
      console.log(this.qtdTicketFornecedor);
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  callLoginByIdService(idUsuario) {
  
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.usuarioEntity.idUsuario = idUsuario;
      this.loginService.loginByIdFornecedorServicos(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
          this.rootPage = HomePage;
          this.loading.dismiss();
          
        }, (err) => {
          this.loading.dismiss();
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
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
