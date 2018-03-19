import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConnectionPage } from '../connection/connection';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  identifiant;
  mdp;
  connected = false;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage) {
    storage.get('identifiant').then((val) => {
      console.log('Votre identifiant est ', val);
      if(val != null){
        this.connected = true;
        this.identifiant = val;
        //this.rafraichir();
      }
    });
    storage.get('mdp').then((val) => {
      console.log('Votre mdp est ', val);
      if(val != null){
        this.mdp = val;
        //this.rafraichir();
      }
    });

  }

  connection(){
  	console.log("Fonction Connection")
  	let modal = this.modalCtrl.create(ConnectionPage);
	  modal.present();
    modal.onDidDismiss((modalData) => {
      console.log('Dismissed modal', modalData);
      if(modalData){
        this.identifiant = modalData.identifiant;
        this.mdp = modalData.mdp;
        this.connected = modalData.connected;
      }else{
        this.identifiant = null;
        this.mdp = null;
        this.connected = false;
      }
    });
  }

  rafraichir(refresher){
    refresher.complete();
  }

}
