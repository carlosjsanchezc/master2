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
  micart:any[]=[];
  currency:string;
  rate:number;
  api_token:string;
  miurl:string;
  total:number;
  subtotal:number;
  taxes:number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public AlertController:AlertController,public  HttpService:HttpService) 
  {
    console.log('Entrando a Modal');
    this.api_token='';
    this.api_token = this.navParams.get('api_token');
    this.miurl=this.navParams.get('url');
    this.currency = this.navParams.get('currency');
    this.rate=this.navParams.get('rate');


console.log('Rate:'+this.rate);
console.log('Symbol'+this.currency);
  
    console.log('token:'+this.api_token);
    console.log('url:'+this.miurl);
    this.vercarro();
  }
  
  save() {
    
  }
  modificapos(i)
  {
    let qty=this.micart[i].quantity;
    let cartid=this.micart[i].cart_id;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/editproductscart&api_token="+this.api_token+"&qty="+qty.toString()+"&cart_id="+cartid.toString();
    console.log("Url:"+urlapi);
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        //this.micart=data['results'];
        console.log(this.micart);
        this.totales();
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
  totales()
  {

    let urlapi=this.HttpService.url+"/index.php?route=api/custom/gettotals&api_token="+this.api_token;
    console.log("Url:"+urlapi);
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carroxxx');
      this.subtotal=data['subtotal'];
      this.taxes=data['taxes'];
      this.taxes=0;
      if (!this.taxes)
      {
        this.taxes=0;
      }
      this.total=data['total'];
      console.log(data);      
     
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
  borrapos(i)
  {
    let qty=this.micart[i].quantity;
    let cartid=this.micart[i].cart_id;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/delproductscart&api_token="+this.api_token+"&cart_id="+cartid.toString();
    console.log("Url:"+urlapi);
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
      this.vercarro();
      
        console.log(this.micart);

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
  vercarro()
  {
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/vproductscart&api_token="+this.api_token;
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        this.micart=data['results'];
        console.log(this.micart);
        this.totales();
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
 
  
  
 
  
