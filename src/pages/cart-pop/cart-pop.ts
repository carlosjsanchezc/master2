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
  countries:any[]=[];
  zones:any[]=[];
  currency:string;
  rate:number;
  api_token:string;
  miurl:string;
  total:number;
  subtotal:number;
  taxes:number;
  country:string;
  zoneid:string;
  nombre:string;
  apellido:string;
  email:string;
  telefono:string;
  empresa:string;
  direccion1:string;
  direccion2:string;
  ciudad:string;
  codigopostal:string;
  country_id:string;
  zone:string;
  metodopago:string;
  codigometododepago:string;
  observaciones:string;
 
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

putorder()
{

  let urlapi=this.HttpService.url+"/index.php?route=api/custom/putorder&api_token="+this.api_token;
  this.codigometododepago="Cheque/Deposito";
  this.metodopago="Cheque/Deposito";
  for (let index = 0; index < this.countries.length; index++) {

    if (this.countries[index].country_id==this.country_id)
    {
      this.country=this.countries[index].name;
    }
    
  }
  for (let index = 0; index < this.zones.length; index++) {
  
    if (this.zones[index].zone_id==this.zoneid)
    {
      this.zone=this.zones[index].name;
    }
    
  }
  urlapi=urlapi+"&nombre="+this.nombre;
  urlapi=urlapi+"&apellido="+this.apellido;
  urlapi=urlapi+"&email="+this.email;
  urlapi=urlapi+"&telefono="+this.telefono;
  urlapi=urlapi+"&direccion1="+this.direccion1;
  urlapi=urlapi+"&direccion2="+encodeURI(this.direccion2);
  urlapi=urlapi+"&empresa="+encodeURI(this.empresa);
  urlapi=urlapi+"&ciudad="+this.ciudad;
  urlapi=urlapi+"&codigopostal="+this.codigopostal;
  urlapi=urlapi+"&pais="+this.country;
  urlapi=urlapi+"&country_id="+this.country_id;
  urlapi=urlapi+"&zone="+this.zone;
  urlapi=urlapi+"&zone_id="+this.zoneid;
  urlapi=urlapi+"&metodopago="+this.metodopago;
  urlapi=urlapi+"&codigometododepago="+this.codigometododepago;
  urlapi=urlapi+"&observaciones="+this.observaciones;



  console.log('URL:')
  console.log(urlapi);

   this.HttpService.httpr(urlapi).subscribe((data) => 
  {
    console.log('Datos de la orden');
    console.log(data)
   this.vercarro();
   let alert = this.AlertController.create({
    title: 'Mensaje',
    subTitle: 'La compra se ha realizado con éxito su número de orden es:'+data['results'],
    buttons: ['Ok']
  });
  alert.present();
  this.viewCtrl.dismiss();
    },
    (error) =>{ 
    console.error(error);
    let alert = this.AlertController.create({
      title: 'Error',
      subTitle: 'Error:'+JSON.stringify(error),
      buttons: ['Ok']
    });
    alert.present();
    });


}

  vercarro()
  {

    this.nombre=this.HttpService.customername;
    this.apellido=this.HttpService.customerlastname;
    this.telefono=this.HttpService.customertelephone;
    this.ciudad=this.HttpService.customercity;
    this.empresa=this.HttpService.customercity;
    this.codigopostal=this.HttpService.customerpostcode;
    this.country_id=this.HttpService.customercountryid;
    this.zoneid=this.HttpService.customerzoneid;
    this.direccion1=this.HttpService.customeraddress1;
    this.direccion2=this.HttpService.customeraddress2;
    this.email=this.HttpService.customeremail;



    //*************** FILLING CART */
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/vproductscart&api_token="+this.api_token;
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        this.micart=data['results'];
        this.totales();
     
      },
      (error) =>{ 
      console.error(error);
      let alert = this.AlertController.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();
      });


      //************* FILLING COUNTRIES */
    urlapi=this.HttpService.url+"/index.php?route=api/custom/getcountries&api_token="+this.api_token;
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        let countries=data['results'];
        console.log(countries);
        console.log('Datos de paises Leidos');
        console.log(countries);
        
        for (let index = 0; index < countries.length; index++) {
          console.log('grupo'+index.toString());
          console.log(countries[index]);
          this.countries.push(countries[index]);
          
        }
        console.log(this.countries);
        this.country_id="229";
        this.getzone("229");
 
      },
      (error) =>{ 
      console.error(error);
      let alert = this.AlertController.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();
      });

  }

  getzone(event)
  {

    //*************** FILLING CART */
    let country_id=event;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/getzones&api_token="+this.api_token+"&country_id="+country_id;
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      
        this.zones=data['results'];
        console.log('Estados/Regiones');
        console.log(this.zones);
       
      },
      (error) =>{ 
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
 
  
  
 
  
