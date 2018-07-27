import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../app/constants';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class FornecedorService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  private usuarioEntity: UsuarioEntity;
  public userChangeEvent = new EventEmitter();
  public emailPessoaChangeEvent = new EventEmitter();

  constructor(public _http: Http) {
  }

  public findDadosFornecedor() {
      try {
  
        return this._http.post(Constants.API_URL + 'findDadosFornecedor/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
          .map(res => res.json())
          .toPromise()
          .catch();
  
      } catch (e){
        if(e instanceof RangeError){
          console.log('out of range');
        }
      }
    }

    public editaDadosFornecedor(fornecedorEntity) {
        try {
    
          return new Promise((resolve, reject) => {
            this._http.post(Constants.API_URL + 'editaDadosFornecedor/'+
            localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(fornecedorEntity), this.options)
              .subscribe(data => {
                resolve(data);
                // this.userChangeEvent.emit(usuarioEntity.nomePessoa);
                // this.emailPessoaChangeEvent.emit(usuarioEntity.emailUsuario);
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