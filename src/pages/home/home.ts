
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';


//modal page 
import { LoadpothosPage } from './../loadpothos/loadpothos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public modalCtrl: ModalController) {

  }


  compartir(){
    console.log("compartiendo foto");
  }

  mostrar_modal(){

    let modal = this.modalCtrl.create(LoadpothosPage);
    modal.present();

  }
}
