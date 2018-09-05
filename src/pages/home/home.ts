import { LoadFileProvider } from './../../providers/load-file/load-file';

import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

//modal page 
import { LoadpothosPage } from './../loadpothos/loadpothos';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  photos: any[];
  areMorePictures:boolean= true;
  
  constructor(public modalCtrl: ModalController,private loadFileProvider:LoadFileProvider, private ssh:SocialSharing) {
    this.photos = loadFileProvider.images;
  }


  /*OJO : Debo tener el facebook instaladooooo!!! */
  compartir(photo:any){
    console.log("compartiendo foto");
   
    this.ssh.shareViaFacebook(photo.title, photo.img, photo.img).then(() => {
          console.log("La foto se compartio en Facebook!");
    }).catch(() => {
      console.log("No pude compartir la foto en facebook");
    });
  }

  mostrar_modal(){

    let modal = this.modalCtrl.create(LoadpothosPage);
    modal.present();

  }


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.loadFileProvider.load_next_images().then(
      ( haymas:boolean )=>{
          console.log("Hay Mas?: ",haymas);
          this.areMorePictures = haymas;
          infiniteScroll.complete();
      });
    
    
  }
}
