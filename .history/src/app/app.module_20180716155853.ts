import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { DatePicker } from '@ionic-native/date-picker';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import {MaskMoneyUtil} from '../utilitarios/maskMoney';

import { MyApp } from './app.component';

//PAGES
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { MenuPage } from '../pages/menu/menu';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { ModalPoliticaPrivacidadePage } from '../pages/modal-politica-privacidade/modal-politica-privacidade';
import { ModalTermosPage } from '../pages/modal-termos/modal-termos';
import { MinhaSenhaPage } from '../pages/minha-senha/minha-senha';
import { OrcamentosListByStatusPage } from '../pages/orcamentos-list-by-status/orcamentos-list-by-status';
import { OrcamentoFornecedorDetalhePage } from '../pages/orcamento-fornecedor-detalhe/orcamento-fornecedor-detalhe';
import { MeusDadosPage } from '../pages/meus-dados/meus-dados';
import { MeuEnderecoPage } from '../pages/meu-endereco/meu-endereco';

//SERVICES
import { EstadosService } from '../providers/estados-service';
import { CidadesService } from '../providers/cidades-service';
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';
import { CockpitCotacaoService } from '../providers/cockpit-cotacao-service';
import { CotacaoService } from '../providers/cotacao-service';
 
//ENTITYS
import { CockpitCotacaoEntity } from '../model/cockpit-cotacao-entity';
import { UsuarioEntity } from '../model/usuario-entity';
import { CotacaoEntity } from '../model/cotacao-entity';
import { CotacaoFornecedorEntity } from '../model/cotacao-fornecedor-entity';
import { ServicoCotacaoFornecedorEntity } from '../model/servico-cotacao-fornecedor-entity';
import { UsuarioDetalheEntity } from '../model/usuario-detalhe-entity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RecuperarSenhaPage,
    MenuPage,
    ConfiguracoesPage,
    ModalPoliticaPrivacidadePage,
    ModalTermosPage,
    MinhaSenhaPage,
    OrcamentosListByStatusPage,
    OrcamentoFornecedorDetalhePage,
    MeusDadosPage,
    MeuEnderecoPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    // IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    },
  ),
    // IonicStorageModule.forRoot({
    //   name: 'carwappfornecedor',
    //   storeName: 'fornecedor',
    //   driverOrder: ['indexeddb']
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RecuperarSenhaPage,
    MenuPage,
    ConfiguracoesPage,
    ModalPoliticaPrivacidadePage,
    ModalTermosPage,
    MinhaSenhaPage,
    OrcamentosListByStatusPage,
    OrcamentoFornecedorDetalhePage,
    MeusDadosPage,
    MeuEnderecoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EstadosService,
    CidadesService,
    LoginService,
    UsuarioService,
    CockpitCotacaoService,
    CockpitCotacaoEntity,
    UsuarioEntity,
    CotacaoEntity,
    CotacaoFornecedorEntity,
    ServicoCotacaoFornecedorEntity,
    UsuarioDetalheEntity,
    CotacaoService,
    DatePicker,
    Push,
    Network,
    AppVersion,
    MaskMoneyUtil,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
