import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ConnectionPage } from '../connection/connection';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { connexionVar } from '../../providers/connexionVar';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  classe: any;
  articles: any;
  favorites: any;
  connected = false;
  Fav: any;
  constructor(private toastCtrl: ToastController, public ConnexionVar: connexionVar, public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController, private storage: Storage, public http: Http) {
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
        if(this.ConnexionVar.getConnectionVar().connected == true){
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
              this.articles = data.articles;
              this.favorites = new Array();
              this.storage.get('Fav').then((val) => {
                if(val){
                  var Fav = JSON.parse(val);
                  console.log(Fav);
                  for(var i in this.articles){
                      if(Fav[this.articles[i].id] == true){
                        if(this.favorites[0] == null){
                          this.favorites[0] = this.articles[i];
                          console.log(this.favorites);
                        }else{
                          this.favorites[this.favorites.length] = this.articles[i];
                        }
                      }
                    }
                  }
              });
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
          this.classe = this.ConnexionVar.getConnectionVar().identifiant.substring(6,7);
        }
        console.log(this.favorites);
      }
    });
    console.log(ConnexionVar.getConnectionVar());
    if(this.ConnexionVar.getConnectionVar().connected == true){
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
          this.articles = data.articles;
          this.favorites = new Array();
          this.storage.get('Fav').then((val) => {
            if(val){
              var Fav = JSON.parse(val);
              console.log(Fav);
              for(var i in this.articles){
                  if(Fav[this.articles[i].id] == true){
                    if(this.favorites[0] == null){
                      this.favorites[0] = this.articles[i];
                      console.log(this.favorites);
                    }else{
                      this.favorites[this.favorites.length] = this.articles[i];
                    }
                  }
                }
              }
          });
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
      this.classe = this.ConnexionVar.getConnectionVar().identifiant.substring(6,7);
    }
    console.log(this.favorites);
    console.log(this.favorites);
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
        this.ConnexionVar.setConnexionVarConnected(modalData.connected);
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
    this.ConnexionVar.setConnexionVarId(null);
    this.ConnexionVar.setConnexionVarMdp(null);
    this.ConnexionVar.setConnexionVarConnected(false);
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
    if(this.ConnexionVar.getConnectionVar().connected == true){
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
          this.articles = data.articles;
          this.favorites = new Array();
          this.storage.get('Fav').then((val) => {
            if(val){
              var Fav = JSON.parse(val);
              console.log(Fav);
              for(var i in this.articles){
                  if(Fav[this.articles[i].id] == true){
                    if(this.favorites[0] == null){
                      this.favorites[0] = this.articles[i];
                      console.log(this.favorites);
                    }else{
                      this.favorites[this.favorites.length] = this.articles[i];
                    }
                  }
                }
              }
          });
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
      this.classe = this.ConnexionVar.getConnectionVar().identifiant.substring(6,7);
    }
    console.log(this.favorites);
  }
  supFav(idArt){
    this.storage.get('Fav').then((val) => {
      if(val != null){
        this.Fav = JSON.parse(val);
        this.Fav[idArt] = false;
        console.log(this.Fav);
        this.storage.set('Fav', JSON.stringify(this.Fav));
        location.reload();
      }
    });

  }

}
