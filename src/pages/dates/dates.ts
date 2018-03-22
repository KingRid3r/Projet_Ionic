import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { connexionVar } from '../../providers/connexionVar';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the DatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {
  dates: any;
  classe: any;
  constructor(private toastCtrl: ToastController, public http: Http, public ConnexionVar: connexionVar, public navCtrl: NavController, public navParams: NavParams) {
    if(ConnexionVar.getConnectionVar().connected == true){
      this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login='+ConnexionVar.getConnectionVar().identifiant+'&mdp='+ConnexionVar.getConnectionVar().mdp)
          .map(res => res.json())
          .subscribe(data => {
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

        }else if(data.dates){
          console.log(data.dates);
          this.dates = data.dates;
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
      console.log(this.dates);
      this.classe = ConnexionVar.getConnectionVar().identifiant.substring(6,7);
      console.log(this.classe);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatesPage');
  }

}
