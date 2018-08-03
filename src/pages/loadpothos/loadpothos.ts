import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-loadpothos',
  templateUrl: 'loadpothos.html',
})
export class LoadpothosPage {

  constructor(private viewCtrl: ViewController) {
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }
}
