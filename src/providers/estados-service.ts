import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EstadosService {
  constructor(private http: Http) {}

  getEstados() {
      return this.http.get('assets/estados/estados.json')
        .map((res: Response) => res.json());
    }
}
