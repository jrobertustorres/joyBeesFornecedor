import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app/constants';


@Injectable()
export class CotacaoService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
//   private usuarioEntity: UsuarioEntity;

  constructor(public _http: Http) {
  }

  public confirmarPedido(cotacaoFornecedorEntity) {
    try {

      return this._http.post(Constants.API_URL + 'confirmarPedido/'
        + localStorage.getItem(Constants.TOKEN_USUARIO),
        JSON.stringify(cotacaoFornecedorEntity), this.options)
        .map(res => res.json())
        .toPromise()
        .catch();

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public rejeitarPedido (cotacaoFornecedorEntity) {
    try {

      return this._http.post(Constants.API_URL + 'rejeitarPedido/'
        + localStorage.getItem(Constants.TOKEN_USUARIO),
        JSON.stringify(cotacaoFornecedorEntity), this.options)
        .map(res => res.json())
        .toPromise()
        .catch();

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

}