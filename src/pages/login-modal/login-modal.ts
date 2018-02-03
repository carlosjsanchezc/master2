import { Component } from '@angular/core';
import {  NavController,ViewController, AlertController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service'


/**
 * Generated class for the EventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {
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
  

  datosusuario:any[]=[];
  address:any[]=[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public AlertController:AlertController,public  HttpService:HttpService) 
  {
    console.log('Entrando a Modal');
    this.username='';
    this.password='';

  }
  
  register()
  {
    this.api_token=this.HttpService.api_token;
    let params="&username="+this.rusername+"&password="+this.rpassword+"&nombre="+this.rnombre+"&apellido="+this.rapellido+"&telefono="+this.rtelefono;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/registercustomer&api_token="+this.api_token+params;

 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);

    });
  }

  doLogin()
  {
    this.api_token=this.HttpService.api_token;
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/logincustomer&api_token="+this.api_token+"&username="+this.username+"&password="+this.password;

 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);
      this.datosusuario=data['results'];
     
      if (this.datosusuario['success']==true)
        {
          this.HttpService.customername=this.datosusuario['firstname'];
          this.HttpService.customerlastname=this.datosusuario['lastname'];
          this.HttpService.customertelephone=this.datosusuario['telephone'];
          this.HttpService.customeraddressid=this.datosusuario['address_id'];
          this.HttpService.customeremail=this.datosusuario['email'];
          let address_id=data['results']['address_id'];


          let urlapi=this.HttpService.url+"/index.php?route=api/custom/getaddress&api_token="+this.api_token+"&address_id="+address_id;

 
    
          this.HttpService.httpr(urlapi).subscribe((data2) => 
          {
            console.log('Direccion');
            console.log(data2);
            this.address=data2['results'];
            if (this.address)
              {
              this.HttpService.customeraddress1=this.address['address_1'].replace("#"," ");
              this.HttpService.customeraddress2=this.address['address_2'].replace("#"," ");
              this.HttpService.customercity=this.address['city'].replace("#"," ");;
              this.HttpService.customercountryid=this.address['country_id'];
              this.HttpService.customerpostcode=this.address['postcode'];
              this.HttpService.customerzoneid=this.address['zone_id'];

              
              
              
               console.log('Iniciada session');
               this.viewCtrl.dismiss(this.datosusuario);

              }
              
      
            //this.rate=data['value'];
          },
          (error) =>{ 
            
          console.error(error);
          });

          
          console.log('Iniciada session');
        } 
        else
        {
          let alert = this.AlertController.create({
            title: 'Mensaje',
            subTitle: 'El usuario no se encuentra o la clave está errada',
            buttons: ['Ok']
          });
          alert.present();
        }
      

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
 
  
  
 
  
