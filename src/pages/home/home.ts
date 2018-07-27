import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

//PAGES
import { OrcamentosListByStatusPage } from '../orcamentos-list-by-status/orcamentos-list-by-status';

//SEVICES
import { CockpitCotacaoService } from '../../providers/cockpit-cotacao-service';

//ENTITYS
import { CockpitCotacaoEntity } from '../../model/cockpit-cotacao-entity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loading = null;
  private cockpitCotacaoEntity: CockpitCotacaoEntity;

  constructor(public navCtrl: NavController,
              private cockpitCotacaoService: CockpitCotacaoService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.cockpitCotacaoEntity = new CockpitCotacaoEntity();

  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
    this.getCockpitCotacaoByUsuario();
  }

  doRefresh(refresher) {
    this.getCockpitCotacaoByUsuario();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  getCockpitCotacaoByUsuario() {
    try {
      // this.loading = this.loadingCtrl.create({
      //   content: 'Aguarde...'
      // });
      // this.loading.present();

      this.cockpitCotacaoService.findCockpitCotacaoByFornecedor(this.cockpitCotacaoEntity)
      .then((cockpitCotacaoServiceResult: CockpitCotacaoEntity) => {
        this.cockpitCotacaoEntity = cockpitCotacaoServiceResult;

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

  openCotacoesList(status) {
    this.navCtrl.push(OrcamentosListByStatusPage, {status: status});
  }


}
