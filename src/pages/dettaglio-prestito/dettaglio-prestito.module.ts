import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DettaglioPrestitoPage } from './dettaglio-prestito';

@NgModule({
  declarations: [
    DettaglioPrestitoPage,
  ],
  imports: [
    IonicPageModule.forChild(DettaglioPrestitoPage),
  ],
})
export class DettaglioPrestitoPageModule {}
