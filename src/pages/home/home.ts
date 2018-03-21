import { Component } from "@angular/core";
import { NavController, Platform } from "ionic-angular";
import { ServizioOggettiPrestatiProvider } from "../../providers/servizio-oggetti-prestati/servizio-oggetti-prestati";
import { OggettoPrestato } from "../../models/oggettoPrestato";
import { DettaglioPrestitoPage } from "../dettaglio-prestito/dettaglio-prestito";
import { AggiungiPrestitoPage } from "../aggiungi-prestito/aggiungi-prestito";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  listaOggettiPrestati: OggettoPrestato[] = [];
  constructor(
    public navCtrl: NavController,
    private serviceObjectOnLoan: ServizioOggettiPrestatiProvider,
    private platform: Platform,
    private storage: NativeStorage
  ) {}

  ionViewDidLoad(){
    this.aggiornaDati();
  }

  ionViewWillEnter() {
    this.aggiornaDati();
  }

  aggiornaDati() {
    this.platform.ready().then(
      () => this.storage.getItem('oggettiImmagazzinati').then(
        oggetto => this.listaOggettiPrestati = oggetto)

    );
  }

  vaiDettaglioPrestito(oggetto: OggettoPrestato) {
    this.navCtrl.push(DettaglioPrestitoPage, {
      prestito: oggetto
    });
  }

  cambiaStatoRestituzione(oggetto: OggettoPrestato) {
    oggetto.ritornato = !oggetto.ritornato;
    this.serviceObjectOnLoan.modificaPrestito(oggetto);
    this.aggiornaDati();
  }

  eliminaItem(oggetto: OggettoPrestato) {
    this.serviceObjectOnLoan.deleteOggettoPrestato(oggetto.id);
    this.aggiornaDati();
  }

  aggiungiPrestito() {
    this.navCtrl.push(AggiungiPrestitoPage, {});
  }
}
