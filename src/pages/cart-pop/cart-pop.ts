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
  botonpago:boolean=true;
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
  cardholder:string;
  cedula:string;
  cardnumber:string;
  cvc:string;
  expirationdate:String=new Date().toISOString();
  voucher:string;
  formadepago:string;
  meses:any[]=[];
  anios:any[]=[];
  islogged:boolean;

 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController, public AlertController:AlertController,public  HttpService:HttpService) 
  {
    this.islogged=this.HttpService.isloging;
    console.log('Entrando a Modal');
    this.api_token='';
    this.api_token = this.navParams.get('api_token');
    this.miurl=this.navParams.get('url');
    this.currency = this.navParams.get('currency');
    this.rate=this.navParams.get('rate');
    let an:string;
    this.formadepago='1';
    an=Date();

    console.log('V:'+this.expirationdate);
    console.log(an);
    an=an.substring(11,15);

console.log('Expiration:');
console.log(this.expirationdate);
    
    
    console.log(an);
    for (let index = 0; index < 11; index++) {
      this.meses[index]=index+1;
      this.anios[index]=(parseInt(an)+index);
      
    }
console.log(this.meses);
console.log(this.anios);
console.log('Rate:'+this.rate);
console.log('Symbol'+this.currency);
  
    console.log('token:'+this.api_token);
    console.log('url:'+this.miurl);
    this.vercarro();
  }
  
  validarlogin(){
    if ((!this.islogged)&&(this.formadepago!='1')){
      this.formadepago='1';
      let alert = this.AlertController.create({
        title: 'Error en forma de pago',
        subTitle: 'Para pagar con tarjeta de crédito usted debe estar registrado y loggeado',
        buttons: ['OK']
      });
   
      alert.present();
      
     
    }
  }

  save() {
    
  }

  validaespeciales(valor){
    let a=valor.target.value;
    console.log('Valor a validar:');
    console.log(valor);
    var b = a.replace(/[^a-z0-9]/gi,'');
    console.log('validando');
    console.log(b);

    valor.target.value=b;

  }
  procesarpago(){
   
    let cadena="";
    let monto=this.total*this.rate

    cadena="?monto="+monto.toString();
    cadena+="&cardholder="+this.cardholder;
    cadena+="&cardholderid="+this.cedula;
    
    cadena+="&cardnumber="+this.cardnumber;
    cadena+="&cvc="+this.cvc;
    cadena+="&expiration="+this.expirationdate.substring(5,7)+'/'+this.expirationdate.substring(0,4);
    cadena+="&direccion1="+this.direccion1;

    cadena+="&ciudad="+this.ciudad;
    cadena+="&codigopostal="+this.codigopostal;
    cadena+="&zonename="+this.zoneid;
    
    
    this.botonpago=false;
   
    let urlapi=this.HttpService.url+"/instapago.php"+cadena;
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
     
        console.log('Respuesta del banco');
        //this.micart=data['results'];
        console.log(data);
        if (data['success']==true){
          let alert = this.AlertController.create({
            title: 'Pagos',
            subTitle: 'Pago Aprobado referencia #'+data['reference'],
            buttons: ['Ok']
          });
          alert.present();
          this.voucher=data['voucher'];
        }
        else
        {
          let alert = this.AlertController.create({
            title: 'Error en datos para procesar el pago',
            subTitle: data['message'],
            buttons: ['Dismiss']
          });
          alert.present();
          this.botonpago=true;
        }

       
      },
      (error) =>{ 
        
        this.botonpago=true;
      let alert = this.AlertController.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();


      });
  }

  modificapos(i)
  {
    let qty=this.micart[i].quantity;
    let cartid=this.micart[i].cart_id;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/editproductscart&api_token="+this.api_token+"&qty="+qty.toString()+"&cart_id="+cartid.toString();
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log('Datos del Carro');
     
        //this.micart=data['results'];
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
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      this.subtotal=data['subtotal'];
      this.taxes=data['taxes'];
      this.taxes=0;
      if (!this.taxes)
      {
        this.taxes=0;
      }
      this.total=data['total'];
      
      },
      (error) =>{ 
        //this.accion=urlapi+'- item:'+JSON.stringify(error);
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
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      this.vercarro();
      
   
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




   this.HttpService.httpr(urlapi).subscribe((data) => 
  {

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

        let countries=data['results'];

        
        for (let index = 0; index < countries.length; index++) {

          this.countries.push(countries[index]);
          
        }

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
 
  
  
 
  
