import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConnectionPage } from '../connection/connection';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { connexionVar } from '../../providers/connexionVar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  connected = false;
  constructor(private ConnexionVar: connexionVar, public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage) {
    storage.get('identifiant').then((val) => {
      console.log('Votre identifiant est ', val);
      if(val != null){
        //this.connected = true;
        ConnexionVar.setConnexionVarConnected(true);
        //this.identifiant = val;
        ConnexionVar.setConnexionVarId(val);
        //this.rafraichir();
      }
    });
    storage.get('mdp').then((val) => {
      console.log('Votre mdp est ', val);
      if(val != null){
        //this.mdp = val;
        ConnexionVar.setConnexionVarMdp(val);
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
        //this.identifiant = modalData.identifiant;
        this.ConnexionVar.setConnexionVarId(modalData.identifiant);
        //this.mdp = modalData.mdp;
        this.ConnexionVar.setConnexionVarMdp(modalData.mdp);
        //this.connected = modalData.connected;
        this.ConnectVar.setConnexionVarConnected(modalData.connected);
      }else{
        //this.identifiant = null;
        this.ConnexionVar.setConnexionVarId(null);
        //this.mdp = null;
        this.ConnexionVar.setConnexionVarMdp(null);
        //this.connected = false;
        this.ConnexionVar.setConnexionVarConnected(false);
      }
    });
  }

  deconnection(){
    //this.identifiant = null;
    //this.mdp = null;
    //this.connected = false;
    this.ConnectVar.setConnexionVarId(null);
    this.ConnectVar.setConnexionVarMdp(null);
    this.ConnectVar.setConnexionVarConnected(false);
    this.storage.get('identifiant').then((val) => {
      console.log('Votre identifiant est ', val);
      if(val != null){
        this.storage.set('identifiant', null);
        this.storage.set('mdp', null);
      }
    });


  }

  rafraichir(refresher){
    refresher.complete();
  }

}
