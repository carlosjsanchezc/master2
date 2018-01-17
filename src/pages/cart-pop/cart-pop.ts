import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController, AlertController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service'


/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-pop',
  templateUrl: 'cart-pop.html',
})
export class CartPopPage {
  event = { nombre: '', cedula:'',fecha:'',telefono:'' };
  micart:any[]=[]
  api_token:string;
  miurl:string;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public AlertController:AlertController,public  HttpService:HttpService) 
  {
    console.log('Entrando a Modal');
    this.api_token='';
    this.api_token = this.navParams.get('api_token');
    this.miurl=this.navParams.get('url');
    
    console.log('token:'+this.api_token);
    console.log('url:'+this.miurl);
    this.vercarro();
  }
  
  save() {
    
  }

  vercarro()
  {
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/vproductscart&api_token="+this.api_token;
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        this.micart=data['results'];
        console.log(this.micart);
      
        //this.micart=data;
      
      },
      (error) =>{ 
        //this.accion=urlapi+'- item:'+JSON.stringify(error);
      console.error(error);
      let alert = this.AlertController.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();
      });

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}
 
  
  
 
  
