import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhaSenhaPage } from './minha-senha';

@NgModule({
  declarations: [
    MinhaSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhaSenhaPage),
  ],
})
export class MinhaSenhaPageModule {}
