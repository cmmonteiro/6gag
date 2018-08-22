import { LoadFileProvider } from './../../providers/load-file/load-file';
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';



@Component({
  selector: 'page-loadpothos',
  templateUrl: 'loadpothos.html',
})
export class LoadpothosPage {
  

  titulo:string;
  imagenPreview:String;
  imagen64 : string;
  
  constructor(private viewCtrl: ViewController, private camera: Camera, private imagePicker: ImagePicker, public _cap:LoadFileProvider) {
  }


  
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  show_camera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.imagenPreview ='data:image/jpeg;base64,' + imageData;
    this.imagen64 = imageData;
    }, (err) => {
        console.log("Error en camara",JSON.stringify(err));
    });
  }

  select_picture(){

    let opciones : ImagePickerOptions= {

      quality:70,
      outputType:1,
      maximumImagesCount:1

    }


    this.imagePicker.getPictures(opciones).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imagenPreview ='data:image/jpeg;base64,' +  results[i];
        this.imagen64 = results[i];
      }
    }, (err) => { 
      console.log("Error al cargar la imagen", JSON.stringify(err));
    });

  }


  crear_post(){

    let archivo = {
      img : this.imagen64,
      titulo:this.titulo

    }

    this._cap.load_images_firebase(archivo);

  }
}
