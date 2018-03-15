import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConnectionPage } from '../connection/connection';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  connection(){
  	console.log("Fonction Connection")
  	let modal = this.modalCtrl.create(ConnectionPage);
	modal.present();
  }
}
