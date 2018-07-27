import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrcamentosListByStatusPage } from './orcamentos-list-by-status';

@NgModule({
  declarations: [
    OrcamentosListByStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(OrcamentosListByStatusPage),
  ],
})
export class OrcamentosListByStatusPageModule {}
