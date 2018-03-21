import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiPrestitoPage } from './aggiungi-prestito';

@NgModule({
  declarations: [
    AggiungiPrestitoPage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiPrestitoPage),
  ],
})
export class AggiungiPrestitoPageModule {}
