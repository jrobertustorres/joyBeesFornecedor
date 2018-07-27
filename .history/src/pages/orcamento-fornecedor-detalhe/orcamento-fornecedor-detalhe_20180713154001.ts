import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';

import {MaskMoneyUtil} from "../../utilitarios/maskMoney";

//ENTITYS
import { CotacaoFornecedorEntity } from '../../model/cotacao-fornecedor-entity';
import { ServicoCotacaoFornecedorEntity } from '../../model/servico-cotacao-fornecedor-entity';

//SERVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';
import { CotacaoService } from './../../providers/cotacao-service';

//PAGES
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-orcamento-fornecedor-detalhe',
  templateUrl: 'orcamento-fornecedor-detalhe.html',
})
export class OrcamentoFornecedorDetalhePage {
  private loading = null;
  private idCotacao: number;
  private statusCotacao: string;
  public respostaServicoForm: FormGroup;
  private cotacaoFornecedorEntity: CotacaoFornecedorEntity;
  private servicoCotacaoFornecedorEntity: ServicoCotacaoFornecedorEntity;
  private isReadOnly = null;
  listServicoResposta: any[];
  public dataEntrega: string;
  public validadeOrcamento: string;
  public dataEntregaServidor: any;
  public validadeOrcamentoServidor: any;
  public valorServico: any;
  public myToast: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private datePicker: DatePicker,
              private cockpitCotacaoService: CockpitCotacaoService,
              private cotacaoService: CotacaoService,
              private toastCtrl: ToastController,
              private maskMoney: MaskMoneyUtil,
              public navParams: NavParams) {
    this.cotacaoFornecedorEntity = new CotacaoFornecedorEntity;
    this.servicoCotacaoFornecedorEntity = new ServicoCotacaoFornecedorEntity;
    this.idCotacao = navParams.get("idCotacao");
    this.statusCotacao = navParams.get("statusCotacao");

  }

  ngOnInit() {
    this.findOrcamentosDetalhes();
    this.respostaServicoForm = this.formBuilder.group({
      'valorServico': ['', [Validators.maxLength(100)]],
      'observacaoServicoCotacao': ['', [Validators.maxLength(200)]],
      'dataEntrega': ['', Validators.required],
      'validadeOrcamento': ['', Validators.required],
      'tipoPagamento': ['', [Validators.required, Validators.maxLength(100)]],
      'prazoPagamento': ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.isReadOnly = this.statusCotacao == 'ABERTO' ? false : true;

    // if(this.isReadOnly) {
    this.respostaServicoForm.controls.dataEntrega.disable();
    this.respostaServicoForm.controls.validadeOrcamento.disable();
    // } else {
    //   this.respostaServicoForm.controls.dataEntrega.enable();
    //   this.respostaServicoForm.controls.validadeOrcamento.enable();
    // }
  }

  ionViewDidLoad() {
  }

  getValorServico(v) {
    this.valorServico = this.maskMoney.maskConvert(v);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.myToast,
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  findOrcamentosDetalhes() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.cotacaoFornecedorEntity.idCotacao = this.idCotacao;

      this.cockpitCotacaoService.detalhaCotacaoFornecedorByIdCotacao(this.cotacaoFornecedorEntity)
      .then((cotacaoServiceResult: CotacaoFornecedorEntity) => {
        this.cotacaoFornecedorEntity = cotacaoServiceResult;

        console.log(this.cotacaoFornecedorEntity);

        if (this.cotacaoFornecedorEntity.dataEntrega != null && this.cotacaoFornecedorEntity.validadeOrcamento != null) {
          this.dataEntrega = new Date(this.cotacaoFornecedorEntity.dataEntrega).toJSON().split('T')[0];
          this.validadeOrcamento = new Date(this.cotacaoFornecedorEntity.validadeOrcamento).toJSON().split('T')[0];
        }

        this.dataEntrega = new Date().toISOString();
        this.validadeOrcamento = new Date().toISOString();

        this.listServicoResposta = this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity;

        this.loading.dismiss();
      }, (err) => {
        this.loading.dismiss();
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: [
          {
            text: 'OK',
            handler: () => {
              this.navCtrl.setRoot(HomePage);
            }
          }]
        }).present();
      });
      
    } catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }
  
  toggleSection(i) {
    this.listServicoResposta[i].open = !this.listServicoResposta[i].open;
    // this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity[i].open = !this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity[i].open;
  }
  
  // toggleItem(i, j) {//NÃO SERÁ USADO
    // this.listServicoResposta[i].open = !this.listServicoResposta[i].open;
    // this.information[i].children[j].open = !this.information[i].children[j].open;
    // this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity[i].nomeServico[j].open = !this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity[i].children[j].open;
  // }
  
  selecionaDataEntrega() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'OK',
      cancelText: 'Cancelar',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
    .then(dataEntrega => {
      this.dataEntregaServidor = dataEntrega;
      this.dataEntrega = dataEntrega.toISOString();
      console.log(dataEntrega);
    }, (err) => {
      console.log('Error occurred while getting date: ', err);
      console.log('---------------------------------------- ', err);
    });
  }
  
  selecionaDataValidadeOrcamento() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'OK',
      cancelText: 'Cancelar',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
    .then(validadeOrcamento => {
      this.validadeOrcamento = validadeOrcamento.toISOString();
      this.validadeOrcamentoServidor = validadeOrcamento;
      console.log(validadeOrcamento);
    }, (err) => {
      console.log('Error occurred while getting date: ', err);
      console.log('---------------------------------------- ', err);
    });
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Falha ao responder!',
      subTitle: 'Ao aceitar o orçamento, é necessário informar o valor do serviço na lista de Produtos/serviços do orçamento.',
      buttons: ['OK']
    });
    alert.present();
  }
  
  aprovarCotacao() {
    try {

      if (this.respostaServicoForm.valid) {

        if (this.respostaServicoForm.value.valorServico != '') {

          this.cotacaoFornecedorEntity = this.respostaServicoForm.value;
          this.cotacaoFornecedorEntity.dataEntrega = this.dataEntregaServidor;
          this.cotacaoFornecedorEntity.validadeOrcamento = this.validadeOrcamentoServidor;
          this.cotacaoFornecedorEntity.idCotacao = this.idCotacao;
          this.listServicoResposta[0].idServicoCotacao = this.listServicoResposta[0].idServicoCotacao;
          this.respostaServicoForm.value.valorServico = this.respostaServicoForm.value.valorServico.replace(".", "");
          this.respostaServicoForm.value.valorServico = this.respostaServicoForm.value.valorServico.replace(",", ".");

          this.listServicoResposta[0].valorServico = this.respostaServicoForm.value.valorServico;
          this.listServicoResposta[0].observacaoServicoCotacao = this.respostaServicoForm.value.observacaoServicoCotacao;

          this.cotacaoFornecedorEntity.listServicoCotacaoFornecedorEntity = this.listServicoResposta;

        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
          this.loading.present();

          console.log(this.cotacaoFornecedorEntity);

            this.cotacaoService
            .confirmarPedido(this.cotacaoFornecedorEntity)
            .then((cotacaoFornecedorEntityResult: CotacaoFornecedorEntity) => {

              this.loading.dismiss();
              this.myToast = 'O orçamento foi respondido!';
              this.presentToast();
              this.navCtrl.setRoot(HomePage);
            }, (err) => {
              this.loading.dismiss();
              this.alertCtrl.create({
                subTitle: err.message,
                buttons: ['OK']
              }).present();
            });
        } else {
          this.showAlert();
        }
      } else {
        Object.keys(this.respostaServicoForm.controls).forEach(campo => {
          const controle = this.respostaServicoForm.get(campo);
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

  rejeitarCotacaoConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Rejeitar orçamento',
      message: 'Deseja realmente rejeitar este orçamento?',
      buttons: [
        {
          text: 'MANTER',
          handler: () => {
          }
        },
        {
          text: 'REJEITAR!',
          handler: () => {
            this.rejeitarCotacao();
          }
        }
      ]
    });
    confirm.present();
  }

  rejeitarCotacao() {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      });
      this.loading.present();

      this.cotacaoFornecedorEntity.idCotacao = this.idCotacao;
      this.cotacaoService
      .rejeitarPedido(this.cotacaoFornecedorEntity)
      .then((orcamentoFornecedorEntityResult: CotacaoFornecedorEntity) => {
        this.loading.dismiss();
        this.myToast = 'O orçamento foi rejeitado!';
        this.presentToast();
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 3000);
      }, (err) => {
        this.loading.dismiss();
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
        }).present();
      });
    } catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

}
