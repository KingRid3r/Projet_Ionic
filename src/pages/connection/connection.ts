import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
/**
 * Generated class for the ConnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {
	rep: any;
  constructor(public http: Http, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }
  connect(){
  	console.log("test")
  	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login=classe1&mdp=mdp1')
 		.map(res => res.json())
 		.subscribe(data => {
	this.rep = data;
	});
  }
  fermeture() {
 	this.viewCtrl.dismiss();
	}


}
