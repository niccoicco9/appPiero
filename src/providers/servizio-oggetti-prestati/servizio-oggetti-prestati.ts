import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { OggettoPrestato } from "../../models/oggettoPrestato";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { NativeStorage } from '@ionic-native/native-storage';


/*
  Questo servizio si occuperà di andare a fornire gli oggetti prestati ai richiedenti,
  nonché anche inserire nuovi oggettiPrestati / modifiche.
*/
@Injectable()
export class ServizioOggettiPrestatiProvider {
  private oggettiPrestati: OggettoPrestato[] = [];

  constructor(private platform: Platform, private storage: NativeStorage) {
    this.platform.ready().then(
      () => {
        this.storage.getItem('oggettiImmagazzinati').then(
               oggetti => this.oggettiPrestati = oggetti,
               () => this.oggettiPrestati = []);
      }
    );
  }



  deleteOggettoPrestato(idOggetto: number) {
    let i = 0;
    while((this.oggettiPrestati[i].id !== idOggetto) && (i < this.oggettiPrestati.length)){
      i++;
    }
    if(i <= this.oggettiPrestati.length){
      this.oggettiPrestati.splice(i,1);
    }
    this.aggiornaStorage('Eliminazione effettuata', 'Impossibile eliminare');
    this.oggettiPrestati.forEach((oggetto, index) => {
      this.oggettiPrestati[index].id = index;
    });
  }



  aggiungiPrestito(oggetto: OggettoPrestato){
    oggetto.id = this.oggettiPrestati.length;
    this.oggettiPrestati.push(oggetto);
    this.aggiornaStorage('Inserimento avvenuto', 'Inserimento fallito');
  }


  modificaPrestito(nuovoOggetto){
    let i = 0;
    while((this.oggettiPrestati[i].id !== nuovoOggetto.id) && (i < this.oggettiPrestati.length)){
      i++;
    }
    this.oggettiPrestati[i].id = nuovoOggetto.id;
    this.oggettiPrestati[i].nome = nuovoOggetto.nome;
    this.oggettiPrestati[i].quando = nuovoOggetto.quando;
    this.oggettiPrestati[i].aChi = nuovoOggetto.aChi;
    this.oggettiPrestati[i].fotografia = nuovoOggetto.fotografia;
    this.oggettiPrestati[i].ritornato = nuovoOggetto.ritornato;

    this.aggiornaStorage('Modifica effettuata', 'Modifica fallita');
  }


  private aggiornaStorage(alertOk, alertFailed) {
    this.storage.setItem('oggettiImmagazzinati', this.oggettiPrestati).then(
        () => alert(alertOk),
        () => alert(alertFailed)
      )
  }

  numeroOggettiPrestati():Observable<number> {
    return of(this.oggettiPrestati.length);
  }
}
