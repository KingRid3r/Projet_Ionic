import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

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
  connexion = {
        identifiant: '',
        mdp: ''};
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }
  connect(form){
    console.log(form.value);
    console.log("connexion");
    this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login='+form.value.identifiant+'&mdp='+form.value.mdp)
        .map(res => res.json())
        .subscribe(data => {
    console.log(data);
      if(data.erreur){
        console.log(data.erreur);

        let toast = this.toastCtrl.create({
          message: data.erreur,
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();

      }else if(data.resultat){
        console.log(data.resultat);
        let toast = this.toastCtrl.create({
          message: data.resultat,
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
        this.fermeture();
      }else{
        console.log("Erreur indéfinie (peut être n'êtes vous pas connecté a internet)");
        let toast = this.toastCtrl.create({
          message: "Erreur indéfinie (peut être n'êtes vous pas connecté a internet)",
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      }

    });
}
  fermeture() {
 	this.viewCtrl.dismiss();
	}


}
