import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';

//I18N
import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage, availableLanguages, sysOptions } from '../pages/i18n/i18n-constants';

import { Globalization } from '@ionic-native/globalization';

@Injectable()
export class LanguageTranslateService {
    languages = availableLanguages;
    selectedLanguage = null;
    private translate: TranslateService;

  constructor(private http: Http,
              translate: TranslateService,
              private globalization: Globalization) {
    this.translate = translate;
  }

  getTranslate() {
      if(localStorage.getItem(Constants.IDIOMA_USUARIO)){
            this.selectedLanguage = localStorage.getItem(Constants.IDIOMA_USUARIO);
          
        } else {
            this.selectedLanguage = 'en';
            localStorage.setItem(Constants.IDIOMA_USUARIO, this.selectedLanguage);
        }

        this.translate.use(this.selectedLanguage);
        
        if (this.selectedLanguage == 'pt-br') {
            return this.http.get('assets/i18n/pt-br.json')
            .map((res: Response) => res.json());
        } else if (this.selectedLanguage == 'en'){
            return this.http.get('assets/i18n/en.json')
            .map((res: Response) => res.json());
        }
    }

}
