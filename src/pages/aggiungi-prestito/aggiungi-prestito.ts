import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { OggettoPrestato } from "../../models/oggettoPrestato";
import { ServizioOggettiPrestatiProvider } from "../../providers/servizio-oggetti-prestati/servizio-oggetti-prestati";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-aggiungi-prestito",
  templateUrl: "aggiungi-prestito.html"
})
export class AggiungiPrestitoPage {
  oggetto: OggettoPrestato;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private servizioOggettiPrestati: ServizioOggettiPrestatiProvider,
    private camera: Camera
  ) {
    this.oggetto = new OggettoPrestato();
  }

  ionViewDidLoad() {
  }

  salvaNuovoPrestito() {
    this.servizioOggettiPrestati.aggiungiPrestito(this.oggetto);
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
        this.oggetto.fotografia = "data:image/jpeg;base64," + imageData;
      },
      err => {
        // Handle error
      }
    );
  }
}
