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
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {
  event = { nombre: '', cedula:'',fecha:'',telefono:'' };
  micart:any[]=[];
  currency:string;
  rate:number;
  api_token:string;
  miurl:string;
  total:number;
  subtotal:number;
  taxes:number;
  product_id:number;
  price:number;
  image:string;
  images:any[]=[];
  options:any[]=[];
  isloginlogic=false;
  optionpick:number;
  name:string;
  myurl:string;
  quantity:number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public AlertController:AlertController,public  HttpService:HttpService) 
  {
    console.log('Entrando a Modal');
    this.api_token='';
    this.api_token = this.navParams.get('api_token');
    this.currency = this.navParams.get('currency');
    this.rate=this.navParams.get('rate');
    this.name=this.navParams.get('name');
    console.log('Name:'+this.name);
    this.product_id = this.navParams.get('product_id');
    this.price = this.navParams.get('price');
    this.image=this.navParams.get('image');
    this.myurl=HttpService.url;
    console.log(this.navParams);
    this.optionpick=1;
    this.quantity=1;
this.getimages();
  }

  agregacarro(product_id,quantity,options)
  {
    

    //let urlapi=this.HttpService.url+"/index.php?route=api/custom/products&api_token="+this.api_token;
    let micadena="&quantity="+this.quantity.toString()+"&product_id="+product_id+"&option="+JSON.stringify(options);
    let urlapi=this.myurl+"/index.php?route=api/custom/addproductscart&api_token="+this.api_token+micadena;
    console.log(urlapi);
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);


      

    },
    (error) =>{ 
      
    console.error(error);
   
    });

  }

  getimages(){
    let urlapi=this.myurl+"/index.php?route=api/custom/productsimgs&api_token="+this.api_token+"&product_id="+this.product_id;

 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);
      this.images=[{'image':this.image}];

    Object.keys(data).map(e => this.images.push(data[e]));
      console.log(this.images);
this.getoptions();
      //this.rate=data['value'];
    },
    (error) =>{ 
      
    console.error(error);
    });
   
  }

  getoptions(){
    let urlapi=this.myurl+"/index.php?route=api/custom/productsoptions&api_token="+this.api_token+"&product_id="+this.product_id;

 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);
      this.options=data['data'];

      console.log(this.options);

      //this.rate=data['value'];
    },
    (error) =>{ 
      
    console.error(error);
    });
   
  }
logiclog(){
  this.isloginlogic=!this.isloginlogic;
}

  closeModal() {
    this.viewCtrl.dismiss();
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}
 
  
  
 
  
