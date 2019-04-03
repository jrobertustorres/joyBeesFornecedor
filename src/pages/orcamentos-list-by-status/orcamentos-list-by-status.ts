import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';
import { LanguageTranslateService } from '../../providers/language-translate-service';

//ENTITYS
import { CotacaoEntity } from './../../model/cotacao-entity';

//PAGES
import { OrcamentoFornecedorDetalhePage } from '../orcamento-fornecedor-detalhe/orcamento-fornecedor-detalhe';

@IonicPage()
@Component({
  selector: 'page-orcamentos-list-by-status',
  templateUrl: 'orcamentos-list-by-status.html',
})
export class OrcamentosListByStatusPage {
  private loading = null;
  private status: string;
  private cotacoesList: any;
  private cotacaoEntity: CotacaoEntity;
  private refresh: boolean = false;
  public languageDictionary: any;
  public statusEnum: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private cockpitCotacaoService: CockpitCotacaoService,
              private languageTranslateService: LanguageTranslateService,
              public navParams: NavParams) {
    this.cotacaoEntity = new CotacaoEntity();
    this.status = navParams.get("status");
  }
  
  ngOnInit() {
    this.getTraducao();
    // this.findOrcamentosListByStatus();
  }

  ionViewDidLoad() {
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
        this.getStatusTranslate();
        this.findOrcamentosListByStatus(null);
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  loadMore(infiniteScroll) {    
    setTimeout(() => {
      this.findOrcamentosListByStatus(infiniteScroll);
      // infiniteScroll.complete();
    }, 500);
  }

  findOrcamentosListByStatus(infiniteScroll: any) {
    try {
      this.cotacaoEntity.limiteDados = this.cotacaoEntity.limiteDados ? this.cotacoesList.length : null;

      if(this.refresh == false) {
        this.loading = this.loadingCtrl.create({
          content: this.languageDictionary.LOADING_TEXT,
        });
        this.loading.present();
      }

      this.cotacaoEntity.statusCotacaoEnum = this.status;

      this.cockpitCotacaoService.findCotacaoFornecedorByStatus(this.cotacaoEntity)
      .then((cotacaoServiceResult: CotacaoEntity) => {
        this.cotacoesList = cotacaoServiceResult;
        this.cotacaoEntity.limiteDados = this.cotacoesList.length;

        if(infiniteScroll) {
          infiniteScroll.complete();
        }

        this.refresh = true;
        this.loading ? this.loading.dismiss() : '';
      }, (err) => {
        this.loading ? this.loading.dismiss() : '';
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

  // getItems(searchbar) {
  //   let q = searchbar.srcElement.value;
  //   if (!q) {
  //     this.findOrcamentosListByStatus();
  //   }
  //   this.aux = this.aux.length == 0 ? this.cotacoesList : this.aux; 

  //   if(this.cotacoesList.length == 0) {
  //     this.cotacoesList = this.aux;
  //   }
  
  //   this.cotacoesList = this.cotacoesList.filter((v) => {
  //     if(v.idOrcamentoFormat && v.dataCadastroFormat && q) {
  //       if ((v.idOrcamentoFormat.toLowerCase().indexOf(q.toLowerCase()) && v.dataCadastroFormat.toLowerCase().indexOf(q.toLowerCase())) > -1) {
  //         return true;
  //       }
  //       return false;
  //     }
  //   });
  // }

  openDetalhaCotacao(idCotacao, statusCotacao) {
    this.navCtrl.push(OrcamentoFornecedorDetalhePage, {idCotacao: idCotacao, statusCotacao: statusCotacao});
  }

  getStatusTranslate() {
    switch(this.status) { 
      case 'ABERTO': { 
          this.statusEnum = this.languageDictionary.LABEL_STATUS_ENUM_ABERTO;
          break; 
      } 
      case 'RESPONDIDO': { 
          this.statusEnum = this.languageDictionary.LABEL_STATUS_ENUM_RESPONDIDO;
          break; 
      } 
      case 'ESCOLHIDO': { 
          this.statusEnum = this.languageDictionary.LABEL_STATUS_ENUM_ESCOLHIDO;
          break; 
      } 
      case 'CONCLUIDO': { 
          this.statusEnum = this.languageDictionary.LABEL_STATUS_ENUM_CONCLUIDO;
          break; 
      } 
      default: { 
          //statements; 
          break; 
      } 
    } 
  }

}
