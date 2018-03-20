import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { connexionVar } from '../../providers/connexionVar';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  articles: any;
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

        }else if(data.articles){
          console.log(data.articles);
          this.articles = data.articles;
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
      console.log(this.articles);
      this.classe = ConnexionVar.getConnectionVar().identifiant.substring(6,7);
      console.log(this.classe);
    }
  }

  rafraichir(refresher){
    this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login='+this.ConnexionVar.getConnectionVar().identifiant+'&mdp='+this.ConnexionVar.getConnectionVar().mdp)
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

      }else if(data.articles){
        console.log(data.articles);
        this.articles = data.articles;
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
    refresher.complete();
  }
}
