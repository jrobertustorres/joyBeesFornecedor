import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

//PAGES
import { OrcamentosListByStatusPage } from '../orcamentos-list-by-status/orcamentos-list-by-status';

//SEVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';
import { LanguageTranslateService } from '../../providers/language-translate-service';

//ENTITYS
import { CockpitCotacaoEntity } from '../../model/cockpit-cotacao-entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loading = null;
  private cockpitCotacaoEntity: CockpitCotacaoEntity;
  private refresh: boolean = false;
  public languageDictionary: any;

  constructor(public navCtrl: NavController,
              private cockpitCotacaoService: CockpitCotacaoService,
              public alertCtrl: AlertController,
              private languageTranslateService: LanguageTranslateService,
              public loadingCtrl: LoadingController) {
    this.cockpitCotacaoEntity = new CockpitCotacaoEntity();

  }

  ngOnInit() {
    this.getTraducao();
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
        this.getCockpitCotacaoByUsuario();
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  doRefresh(refresher) {
    this.getCockpitCotacaoByUsuario();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  getCockpitCotacaoByUsuario() {
    try {
      if(this.refresh == false) {
        this.loading = this.loadingCtrl.create({
          content: this.languageDictionary.LOADING_TEXT,
        });
        this.loading.present();
      }

      this.cockpitCotacaoService.findCockpitCotacaoByFornecedor(this.cockpitCotacaoEntity)
      .then((cockpitCotacaoServiceResult: CockpitCotacaoEntity) => {
        this.cockpitCotacaoEntity = cockpitCotacaoServiceResult;

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

  openCotacoesList(status) {
    this.navCtrl.push(OrcamentosListByStatusPage, {status: status});
  }

}
