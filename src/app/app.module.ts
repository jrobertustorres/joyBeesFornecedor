import { HttpModule, Http  } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { DatePicker } from '@ionic-native/date-picker';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import {MaskMoneyUtil} from '../utilitarios/maskMoney';

import { MyApp } from './app.component';

//PROVIDERS
import { LanguageProvider } from '../providers/language-provider';

//TRANSLATE
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Globalization } from '@ionic-native/globalization';

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
import { CadastroFornecedorPage } from '../pages/cadastro-fornecedor/cadastro-fornecedor';

//SERVICES
import { EstadosService } from '../providers/estados-service';
import { CidadesService } from '../providers/cidades-service';
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';
import { FornecedorService } from '../providers/fornecedor-service';
import { CockpitCotacaoService } from '../providers/cockpit-cotacao-service';
import { CotacaoService } from '../providers/cotacao-service';
import { VersaoAppService } from '../providers/versao-app-service';
import { LanguageTranslateService } from '../providers/language-translate-service';
 
//ENTITYS
import { CockpitCotacaoEntity } from '../model/cockpit-cotacao-entity';
import { UsuarioEntity } from '../model/usuario-entity';
import { CotacaoEntity } from '../model/cotacao-entity';
import { CotacaoFornecedorEntity } from '../model/cotacao-fornecedor-entity';
import { ServicoCotacaoFornecedorEntity } from '../model/servico-cotacao-fornecedor-entity';
import { FornecedorEntity } from '../model/fornecedor-entity';
import { VersaoAppEntity } from '../model/versao-app-entity';
import { PreCadastroEntity } from '../model/pre-cadastro-entity';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HttpClientModule, HttpClient } from '@angular/common/http';

// export function createTranslateLoader(http: HttpClient) {
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    CadastroFornecedorPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    // HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
        // deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    },
  ),
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
    CadastroFornecedorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageProvider,
    LanguageTranslateService,
    EstadosService,
    CidadesService,
    LoginService,
    UsuarioService,
    CockpitCotacaoService,
    VersaoAppService,
    CotacaoService,
    FornecedorService,
    CockpitCotacaoEntity,
    UsuarioEntity,
    CotacaoEntity,
    CotacaoFornecedorEntity,
    ServicoCotacaoFornecedorEntity,
    FornecedorEntity,
    VersaoAppEntity,
    PreCadastroEntity,
    DatePicker,
    Push,
    Network,
    AppVersion,
    MaskMoneyUtil,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
