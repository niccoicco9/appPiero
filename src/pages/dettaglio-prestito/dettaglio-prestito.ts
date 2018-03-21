import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OggettoPrestato } from '../../models/oggettoPrestato';
import { HomePage } from '../home/home';
import { ServizioOggettiPrestatiProvider } from '../../providers/servizio-oggetti-prestati/servizio-oggetti-prestati';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the DettaglioPrestitoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dettaglio-prestito',
  templateUrl: 'dettaglio-prestito.html',
})
export class DettaglioPrestitoPage {

  oggettoCondiviso: OggettoPrestato;
  oggettoLocale: OggettoPrestato;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private servizioOggettiPrestati : ServizioOggettiPrestatiProvider,
              private camera: Camera) {
    this.oggettoLocale = this.navParams.get('prestito');
    //this.oggettoLocale = Object.assign({}, this.oggettoCondiviso);  // Mi serve per fare una copia in locale del contenuto dell'oggetto che mi arriva dalla lista

  }

  ionViewDidLoad() {
  }

  salvaModifiche(){
    // alert('fdsfsdfs');
    this.servizioOggettiPrestati.modificaPrestito(this.oggettoLocale);
    // Torno indietro alla home
    this.navCtrl.pop();
  }

  nuovaImmagine(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.oggettoLocale.fotografia = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
      }
    );
  }
}
