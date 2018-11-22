import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Platform } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';

import {MaskMoneyUtil} from "../../utilitarios/maskMoney";

//ENTITYS
import { CotacaoFornecedorEntity } from '../../model/cotacao-fornecedor-entity';
import { ServicoCotacaoFornecedorEntity } from '../../model/servico-cotacao-fornecedor-entity';
import { CotacaoEntity } from './../../model/cotacao-entity';

//SERVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';
import { CotacaoService } from './../../providers/cotacao-service';
import { LanguageTranslateService } from '../../providers/language-translate-service';

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
  private cotacaoEntity: CotacaoEntity;
  private isReadOnly = null;
  listServicoResposta: any[];
  public dataEntrega: string;
  public validadeOrcamento: string;
  public dataEntregaServidor: any;
  public validadeOrcamentoServidor: any;
  public valorServico: any;
  public myToast: string;
  public respostaServicoFormat: any;
  public languageDictionary: any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private datePicker: DatePicker,
              private cockpitCotacaoService: CockpitCotacaoService,
              private cotacaoService: CotacaoService,
              private toastCtrl: ToastController,
              private maskMoney: MaskMoneyUtil,
              public platform: Platform,
              private languageTranslateService: LanguageTranslateService,
              public navParams: NavParams) {
    this.cotacaoFornecedorEntity = new CotacaoFornecedorEntity;
    this.servicoCotacaoFornecedorEntity = new ServicoCotacaoFornecedorEntity;
    this.cotacaoEntity = new CotacaoEntity;
    this.idCotacao = navParams.get("idCotacao");
    this.statusCotacao = navParams.get("statusCotacao");

  }

  ngOnInit() {
    this.getTraducao();
    this.respostaServicoForm = this.formBuilder.group({
      'valorServico': ['', [Validators.required, Validators.maxLength(100)]],
      'observacaoServicoCotacao': ['', [Validators.maxLength(200)]],
      'dataEntrega': ['', Validators.required],
      'validadeOrcamento': ['', Validators.required],
      'tipoPagamento': ['', [Validators.required, Validators.maxLength(100)]],
      // 'prazoPagamento': ['', [Validators.required, Validators.maxLength(100)]],
    });
    this.isReadOnly = this.statusCotacao == 'ABERTO' ? false : true;

    this.respostaServicoForm.controls.dataEntrega.disable();
    this.respostaServicoForm.controls.validadeOrcamento.disable();
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
        this.findOrcamentosDetalhes();
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
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
        content: this.languageDictionary.LOADING_TEXT,
      });
      this.loading.present();

      this.cotacaoFornecedorEntity.idCotacao = this.idCotacao;
      this.cockpitCotacaoService.detalhaCotacaoFornecedorByIdCotacao(this.cotacaoFornecedorEntity)
      .then((cotacaoServiceResult: CotacaoFornecedorEntity) => {
        this.cotacaoFornecedorEntity = cotacaoServiceResult;

        // para testes no browser com data
        if (!this.platform.is('cordova')) {
          this.dataEntrega = new Date().toISOString();
          this.validadeOrcamento = new Date().toISOString();
  
          this.dataEntregaServidor = this.dataEntrega;
          this.validadeOrcamentoServidor = this.validadeOrcamento;
        }

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
  }
  
  selecionaDataEntrega() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'OK',
      cancelText: this.languageDictionary.CANCELAR,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
    .then(dataEntrega => {
      this.dataEntrega = dataEntrega.toISOString();
      this.dataEntregaServidor = dataEntrega;
    }, (err) => {
    });
  }
  
  selecionaDataValidadeOrcamento() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      okText: 'OK',
      cancelText: this.languageDictionary.CANCELAR,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    })
    .then(validadeOrcamento => {
      this.validadeOrcamento = validadeOrcamento.toISOString();
      this.validadeOrcamentoServidor = validadeOrcamento;
    }, (err) => {
    });
  }
  
  aprovarCotacao() {
    try {

      if (this.respostaServicoForm.valid) {
        this.respostaServicoFormat = this.cotacaoFornecedorEntity;

          this.loading = this.loadingCtrl.create({
            content: this.languageDictionary.LOADING_TEXT,
          });
          this.loading.present();

          this.respostaServicoFormat = this.respostaServicoForm.value;
          this.respostaServicoFormat.dataEntrega = this.dataEntregaServidor;
          this.respostaServicoFormat.validadeOrcamento = this.validadeOrcamentoServidor;
          this.respostaServicoFormat.idCotacao = this.idCotacao;

          this.listServicoResposta[0].idServicoCotacao = this.listServicoResposta[0].idServicoCotacao;
          this.respostaServicoForm.value.valorServico = this.respostaServicoForm.value.valorServico.replace(",", "");
          
          this.listServicoResposta[0].valorServico = this.respostaServicoForm.value.valorServico;
          this.listServicoResposta[0].observacaoServicoCotacao = this.respostaServicoForm.value.observacaoServicoCotacao;
          
          this.respostaServicoFormat.listServicoCotacaoFornecedorEntity = this.listServicoResposta;
          
            this.cotacaoService
            .confirmarPedido(this.respostaServicoFormat)
            .then((cotacaoFornecedorEntityResult: CotacaoFornecedorEntity) => {

              this.loading.dismiss();
              this.myToast = this.languageDictionary.LABEL_ORCAMENTO_RESPONDIDO;
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
        // } else {
        //   this.showAlert();
        // }
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
      title: this.languageDictionary.BTN_REJEITAR_ORCAMENTO,
      message: this.languageDictionary.SUBTITLE_REJEITAR_ORCAMENTO,
      buttons: [
        {
          text: this.languageDictionary.BTN_MANTER,
          handler: () => {
          }
        },
        {
          text: this.languageDictionary.BTN_REJEITAR,
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
        content: this.languageDictionary.LOADING_TEXT,
      });
      this.loading.present();

      this.cotacaoFornecedorEntity.idCotacao = this.idCotacao;
      this.cotacaoService
      .rejeitarPedido(this.cotacaoFornecedorEntity)
      .then((orcamentoFornecedorEntityResult: CotacaoFornecedorEntity) => {
        this.loading.dismiss();
        this.myToast = this.languageDictionary.LABEL_ORCAMENTO_REJEITADO;
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

  concluirCotacaoConfirm() {
    let confirm = this.alertCtrl.create({
      title: this.languageDictionary.BTN_CONCLUIR_ORCAMENTO,
      message: this.languageDictionary.SUBTITLE_CONCLUIR_ORCAMENTO,
      buttons: [
        {
          text: this.languageDictionary.LABEL_NAO_UPPER,
          handler: () => {
          }
        },
        {
          text: this.languageDictionary.BTN_CONCLUIR,
          handler: () => {
            this.concluirCotacao();
          }
        }
      ]
    });
    confirm.present();
  }

  concluirCotacao() {
    try {
      this.loading = this.loadingCtrl.create({
        content: this.languageDictionary.LOADING_TEXT,
      });
      this.loading.present();

      this.cotacaoEntity.idCotacao = this.idCotacao;
      this.cotacaoService
      .concluirCotacao(this.cotacaoEntity)
      .then((cotacaoEntityResult: CotacaoEntity) => {
        this.loading.dismiss();
        this.myToast = this.languageDictionary.LABEL_ORCAMENTO_CONCLUIDO;
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
