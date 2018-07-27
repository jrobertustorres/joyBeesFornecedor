import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class UsuarioService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  private usuarioEntity: UsuarioEntity;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();

  constructor(public _http: Http) {
  }

  public atualizaSenhaUsuario(usuarioEntity) {
      try {
  
        return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'alteraSenhaUsuario/'+
          localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(usuarioEntity), this.options)
            .subscribe(data => {
              resolve(data);
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

  public recuperasenhaService(usuarioEntity) {
    try {

      // this.usuarioEntity = new UsuarioEntity();
      return new Promise((resolve, reject) => {
        this._http.post(Constants.API_URL + 'recuperaSenha/', JSON.stringify(usuarioEntity), this.options)
          .map(function (res) { return res.json(); })
          .subscribe(data => {
            resolve(data);
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