import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-loadpothos',
  templateUrl: 'loadpothos.html',
})
export class LoadpothosPage {


  titulo:string;
  
  constructor(private viewCtrl: ViewController) {
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }
}
