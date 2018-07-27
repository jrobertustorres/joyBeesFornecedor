import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app/constants';

@Injectable()
export class CockpitCotacaoService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });

  constructor(public _http: Http) {
  }

  public findCockpitCotacaoByFornecedor(cockpitCotacaoEntity) {
    try {

      return this._http.post(Constants.API_URL + 'findCockpitCotacaoByFornecedor/'
        + localStorage.getItem(Constants.TOKEN_USUARIO),
        JSON.stringify(cockpitCotacaoEntity), this.options)
        .map(res => res.json())
        .toPromise()
        .catch();

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findCotacaoFornecedorByStatus(cotacaoEntity) {
    try {

      return this._http.post(Constants.API_URL + 'findCotacaoFornecedorByStatus/'
        + localStorage.getItem(Constants.TOKEN_USUARIO),
        JSON.stringify(cotacaoEntity), this.options)
        .map(res => res.json())
        .toPromise()
        .catch();

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public detalhaCotacaoFornecedorByIdCotacao(cotacaoFornecedorEntity) {
    try {
  
      return new Promise((resolve, reject) => {
        this._http.post(Constants.API_URL + 'detalhaCotacaoFornecedorByIdCotacao/'+
        localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(cotacaoFornecedorEntity), this.options)
          .subscribe(data => {
            console.log(data.json());
            resolve(data.json());
          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

}