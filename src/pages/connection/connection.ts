import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ViewController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
        mdp: '',
        souvenir: false};
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private toastCtrl: ToastController, private storage: Storage) {
    this.storage.get('identifiant').then((val) => {
      console.log('Votre identifiant est ', val);
    });
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
        if(form.value.souvenir == true){
          this.storage.set('identifiant', form.value.identifiant);
          this.storage.set('mdp', form.value.mdp);
        }
        this.fermeture(form.value.identifiant, form.value.mdp);
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
  fermeture(_identifiant, _mdp) {
  this.viewCtrl.dismiss({
    identifiant: _identifiant,
    mdp: _mdp,
    connected: true
  });
	}


}
