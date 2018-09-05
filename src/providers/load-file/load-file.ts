import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { ToastController } from 'ionic-angular';


@Injectable()
export class LoadFileProvider {


  images:ImageToLoad[] = [];
  lastKey: string = null;

  constructor(public toastCtrl: ToastController, public afDB:AngularFireDatabase) {
    console.log('Hello LoadFileProvider Provider');
    this.load_last_key().subscribe( ()=>{

        this.load_next_images();

    });
  }


  private load_last_key(){

    //last es un arreglo con lo que viene de l ref
   return this.afDB.list('/post',ref => ref.orderByKey().limitToLast(1)).
    valueChanges().map( (last:any) =>{ 
    console.log(last);
    this.lastKey = last[0].key;
    this.images.push(last[0]);

   });
  }
  


  load_next_images(){

    let promesa = new Promise((resolve, reject)=>{

        this.afDB.list('/post',
            ref=>ref.limitToLast(3).orderByKey().endAt(this.lastKey)
      ).valueChanges()
       .subscribe((posts:any)=>{
        
          posts.pop();
          if (posts.length == 0){
            console.log("Ya no hay mas registros");
            resolve(false);
            return ;
          }

          this.lastKey = posts[0].key;

          for (let index = posts.length-1; index>=0; index--) {
            
            let element = posts[index];
            this.images.push(element);
          }
          resolve(true);
      })

    });
    return promesa;


  }

  load_images_firebase(image:ImageToLoad){

    let promesa = new Promise((resolve, reject) =>{

      this.show_toast("Cargando ...");


      let storeRef = firebase.storage().ref();
      let fileName : string = new Date().valueOf().toString();

      let uploadTask : firebase.storage.UploadTask = 
          storeRef.child(`img/${ fileName }`)
                  .putString( image.img ,'base64', {contentType:'image/jpeg'} );

          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                ()=>{},//saber el % de Mb se han subido
                ( error )=>{
                    //manejo de error
                    console.log("Error en la carga");
                    console.log(JSON.stringify(error));
                    this.show_toast(JSON.stringify(error));
                    reject();//si sucede un error llamamos a reject
                },

                ()=>{
                  //TODO BIEN!!
                  console.log("Archivo Subido");
                  this.show_toast("Imagen cargada correctamente");
                  let url = uploadTask.snapshot.downloadURL; 

                  console.log("URL Imagen: ",url);
                  this.crear_post_bd(image.titulo,url,fileName);

                  resolve();
                }
          );        

    });

    return promesa;
    
  }


  private crear_post_bd(title:string, url:string,fileName: string){

    let post: ImageToLoad ={
        img : url,
        titulo:title,
        key: fileName

    }

    console.log(JSON.stringify(post));

    //this.afDB.list('/post').push(post); pone un id propio
    this.afDB.object(`/post/${ fileName }`).update(post);
    this.images.push(post);


  }


  show_toast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).present();
  }


}



//modelo del objeto
interface ImageToLoad{

    titulo: string;
    img: string;
    key?: string;

}


