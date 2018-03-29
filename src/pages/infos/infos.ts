import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactAddress } from '@ionic-native/contacts';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the InfosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-infos',
  templateUrl: 'infos.html',
})
export class InfosPage {

  constructor(private toastCtrl: ToastController, private contacts: Contacts, public navCtrl: NavController, public navParams: NavParams) {
  }
  addContact(){
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, 'petit Prince', 'Ecole');
    contact.phoneNumbers = [new ContactField('Bureau', '0412345678')];
    contact.addresses = [new ContactAddress(false,'Ecole', 'École le Petit Prince ','1, rue des écoles', 'Saint Exupéry', 'PACA', '13000', 'France')];
    contact.emails = [new ContactField('Mail', 'contact@lepetitprince.fr')];
    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );
    let toast = this.toastCtrl.create({
      message: "Contact ajouté dans votre carnet d'addresses",
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosPage');
  }

}
