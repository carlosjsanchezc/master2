import { Component, ViewChild } from '@angular/core';
import {  Platform, NavController, ModalController, NavParams,ViewController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-atencion-modal',
  templateUrl: 'atencion-modal.html',
})
export class AtencionModalPage {
  event = { nombre: '', cedula:'',fecha:'',telefono:'' };
  micart:any[]=[];
  api_token:string;
  isloginlogic=false;
  username:string;
  password:string;
  email:string;
  nombre:string;
  apellido:string;
  rusername:string;
  rpassword:string;
  remail:string;
  rnombre:string;
  rapellido:string;
  rtelefono:string;
  error:string;
  superuser:boolean;
  datosusuario:any[]=[];
  address:any[]=[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private callNumber: CallNumber) 
  {
    console.log('Entrando a Modal');
    this.username='';
    this.password='';

  }
  callnumber(){
    this.callNumber.callNumber("04245189633", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}