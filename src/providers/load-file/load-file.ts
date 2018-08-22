import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ToastController } from 'ionic-angular';
import { storage } from 'firebase/app';


@Injectable()
export class LoadFileProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello LoadFileProvider Provider');
  }


  load_images_firebase(image:ImageToLoad){

    let promesa = new Promise((resolve, reject) =>{

      this.show_toast("Cargando ...");


      let storeRef = firebase.storage().ref();
      let fileName : string = new Date().valueOf().toString();
      let uploadTask : firebase.storage.UploadTask = 


          storeRef.child(`img/${ fileName }`)
                  .putString( image.img ,'base64', {contentType:'image/jpeg'} );

          uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                ()=>{},//saber el % de bytes se han subido
                ( error )=>{

                    console.log("Error en la carga");
                    console.log(JSON.stringify(error));
                    this.show_toast(JSON.stringify(error));
                    reject()
                    ;

                },

                ()=>{
                  //TODO BIEN!!
                  console.log("Archivo Subido");
                  this.show_toast("Imagen cargada correctamente");
                  resolve();
                },

                

          
          );        

    });

    return promesa;
    
  }


  show_toast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    }).present();
  }
}


interface ImageToLoad{

titulo: string;
img: string;
key?: string;

}