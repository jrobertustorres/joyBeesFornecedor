import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//SERVICES
import { LanguageTranslateService } from '../../providers/language-translate-service';
import { FornecedorService } from '../../providers/fornecedor-service';

//ENTITYS
import { PreCadastroEntity } from '../../model/pre-cadastro-entity';

//PAGES
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-cadastro-fornecedor',
  templateUrl: 'cadastro-fornecedor.html',
})
export class CadastroFornecedorPage {
  public cadastrarFornecedorForm: FormGroup;
  private loading = null;
  public languageDictionary: any;
  private preCadastroEntity: PreCadastroEntity;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private languageTranslateService: LanguageTranslateService,
              private fornecedorService: FornecedorService,
              public navParams: NavParams) {
    this.preCadastroEntity = new PreCadastroEntity();
  }

  ngOnInit() {
    this.getTraducao();
    this.cadastrarFornecedorForm 	= this.formBuilder.group({
      'pessoaContato': ['', Validators.required],
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'telefone': ['', Validators.required],
      'areaAtuacao': ['', Validators.required],
   });
  }

  getTraducao() {
    try {

      this.languageTranslateService
      .getTranslate()
      .subscribe(dados => {
        this.languageDictionary = dados;
      });
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  submeterPreCadastroFornecedor() {
    try {

      if (this.cadastrarFornecedorForm.valid) {

        this.loading = this.loadingCtrl.create({
          content: this.languageDictionary.LOADING_TEXT,
        });
        this.loading.present();

        this.preCadastroEntity = this.cadastrarFornecedorForm.value;
        this.preCadastroEntity.preCadastroServico = true;

        this.fornecedorService.preCadastroFornecedor(this.preCadastroEntity)
          .then((preCadastroEntityResult: PreCadastroEntity) => {

            this.loading.dismiss();
            this.showAlertPreCadastro();
          }, (err) => {
            this.loading.dismiss();
            this.alertCtrl.create({
              subTitle: err.message,
              buttons: ['OK']
            }).present();
        });
      } else {
        Object.keys(this.cadastrarFornecedorForm.controls).forEach(campo => {
          const controle = this.cadastrarFornecedorForm.get(campo);
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

  showAlertPreCadastro() {
    const alert = this.alertCtrl.create({
      title: this.languageDictionary.TITLE_CONTATO_ENVIADO,
      subTitle: this.languageDictionary.SUBTITLE_CONTATO_ENVIADO,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navCtrl.setRoot(LoginPage);
        }
      }]
    });
    alert.present();
  }


}
