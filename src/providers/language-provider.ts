import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app/constants';

//ENTITY
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class LanguageProvider {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  public languageChangeEvent = new EventEmitter();
  private usuarioEntity: UsuarioEntity;

  constructor(public http: Http) {
    this.usuarioEntity = new UsuarioEntity();
  }

  getLanguageProvider(selectedLanguage) {
      this.languageChangeEvent.emit(selectedLanguage);
      this.setLanguageService(selectedLanguage);
    }

  public setLanguageService(selectedLanguage) {
    try {
      selectedLanguage = selectedLanguage == 'pt-br' ? 'PORTUGUES' : 'INGLES';
      this.usuarioEntity.idiomaUsuario = selectedLanguage;
      return new Promise((resolve, reject) => {
        this.http.post(Constants.API_URL + 'editaIdiomaUsuario/'
        + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(this.usuarioEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
            this.languageChangeEvent.emit(selectedLanguage);
          }, (err) => {
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }
}
