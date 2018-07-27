import { Component } from '@angular/core';
import { Constants } from '../../app/constants';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

//SERVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';

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
  private aux = [];
  public qtdTicketFornecedor: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private cockpitCotacaoService: CockpitCotacaoService,
              public navParams: NavParams) {
    this.cotacaoEntity = new CotacaoEntity();
    this.status = navParams.get("status");
  }
  
  ngOnInit() {
    this.findOrcamentosListByStatus();
    this.qtdTicketFornecedor = localStorage.getItem(Constants.QTD_TICKET_FORNECEDOR);
  }

  ionViewDidLoad() {
  }

  findOrcamentosListByStatus() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.cotacaoEntity.statusCotacaoEnum = this.status;

      this.cockpitCotacaoService.findCotacaoFornecedorByStatus(this.cotacaoEntity)
      .then((cotacaoServiceResult: CotacaoEntity) => {
        this.cotacoesList = cotacaoServiceResult;

        this.loading.dismiss();
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

  getItems(searchbar) {
    let q = searchbar.srcElement.value;
    if (!q) {
      this.findOrcamentosListByStatus();
    }
    this.aux = this.aux.length == 0 ? this.cotacoesList : this.aux; 

    if(this.cotacoesList.length == 0) {
      this.cotacoesList = this.aux;
    }
  
    this.cotacoesList = this.cotacoesList.filter((v) => {
      if(v.cotacao && q) {
        if ((v.idOrcamentoFormat.toLowerCase().indexOf(q.toLowerCase()) && v.nomeCliente.toLowerCase().indexOf(q.toLowerCase())) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  // getItems(searchbar) {
  //   let q = searchbar.srcElement.value;
  //   if (!q) {
  //     this.findOrcamentosListByStatus();
  //   }
  
  //   this.cotacoesList = this.cotacoesList.filter((v) => {
  //     // if(v.servico && v.tipoServico && q) {
  //     if(v.idOrcamentoFormat && v.nomeCliente && q) {
  //       // if (v.cotacao.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //         if ((v.idOrcamentoFormat.toLowerCase().indexOf(q.toLowerCase()) && v.nomeCliente.toLowerCase().indexOf(q.toLowerCase())) > -1) {
  //           return true;
  //         }
  //         return false;
  //       }
  //   });
  // }

  openDetalhaCotacao(idCotacao, statusCotacao) {
    // if(this.qtdTicketFornecedor == '0' && statusCotacao == 'ABERTO') {
    //   this.alertTicket();
    // } else {
      this.navCtrl.push(OrcamentoFornecedorDetalhePage, {idCotacao: idCotacao, statusCotacao: statusCotacao});
    // }
  }

  // alertTicket() {
  //   const alert = this.alertCtrl.create({
  //     title: 'Tickets insuficientes!',
  //     subTitle: 'Você não possui tickets suficientes para ver este orçamento!',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}
