import { NgModule } from '@angular/core';
import { IonicModule, Platform, IonicPageModule } from 'ionic-angular';

import { I18nPage } from './i18n';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization';

import { defaultLanguage, availableLanguages, sysOptions } from '../i18n/i18n-constants';

@NgModule({
  // imports: [IonicModule, TranslateModule],
  imports: [
    IonicPageModule.forChild(I18nPage), 
    IonicModule, TranslateModule
  ],
  declarations: [I18nPage],
  
})

export class I18nPageModule {
  constructor(platform: Platform, 
              translate: TranslateService, 
              private globalization: Globalization) {
    platform.ready().then(() => {
      translate.setDefaultLang(defaultLanguage);

      if ((<any>window).cordova) {
        this.globalization.getPreferredLanguage().then(result => {
          var language = this.getSuitableLanguage(result.value);
          translate.use(language);
          sysOptions.systemLanguage = language;
        });
      }
      else {
        let browserLanguage = translate.getBrowserLang() || defaultLanguage;
        var language = this.getSuitableLanguage(browserLanguage);
        translate.use(language);
        sysOptions.systemLanguage = language;
      }
    });
  }

  getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
  }
}
