
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

//firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

//modal page 
import { LoadpothosPage } from './../loadpothos/loadpothos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  photos: Observable<any[]>;

  constructor(public modalCtrl: ModalController, afDB: AngularFireDatabase) {
    this.photos = afDB.list('post').valueChanges();
  }

  compartir(){
    console.log("compartiendo foto");
  }

  mostrar_modal(){

    let modal = this.modalCtrl.create(LoadpothosPage);
    modal.present();

  }
}
