import { Component } from '@angular/core';
import { NavController,LoadingController,ModalController, AlertController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service'

import { CartPopPage} from '../cart-pop/cart-pop';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banners:any[] = [];
  products:any[] = [];
  aproducts:any[] = [];
  categorias:any[]=[];
  rate:number;
  countcart=0;
  losrows=0;
  accion='';
  productsgrid:any[]=[];
  myurl:string;
  api_token:string;
  constructor(public navCtrl: NavController, public HttpService:HttpService,public loadingCtrl: LoadingController,public modalCtrl: ModalController, public alertCtrl:AlertController) {
    this.api_token='';
    this.rate=0;
    this.loginapi();
    this.cargarBanner();

    //this.presentLoading();

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 2000
    });
    loader.present();
  }

  getrate()
  {
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/ratecurrency&api_token="+this.api_token;
 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);
      //this.rate=data['value'];
    },
    (error) =>{ 
    console.error(error);
    });

  }



  agregacarro(product_id,quantity)
  {
    this.accion='Agregando a carro..';
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/addcart&quantity="+quantity+"&product_id="+product_id+"&api_token="+this.api_token;
    let loader = this.loadingCtrl.create({
      content: "Agregando item al carro...",
      duration: 2000
    });
    loader.present();
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);

      this.accion='Item agregado con exito';
      this.countcart+=1;

    },
    (error) =>{ 
      this.accion=urlapi+'- item:'+JSON.stringify(error);
    console.error(error);
    });

  }

  vercarro()
  {

      console.log('Modal');
      console.log(this.api_token);
      console.log(this.myurl);


   
      let myModal = this.modalCtrl.create(CartPopPage,{api_token:this.api_token, url:this.myurl});
      console.log('click modal');
      myModal.present();
      console.log('Modal presentado');
      
  
      myModal.onDidDismiss(data => {
        console.log('Saliendo');
        
        });
 
  }
  getcategorias()
  {

    let urlapi=this.HttpService.url+"/index.php?route=api/custom/categs&api_token="+this.api_token;
 
    
    this.HttpService.getCategorias(urlapi).subscribe((data) => 
    {
      console.log('Categorias');
      this.categorias=[];
      console.log(data['success']['products']);
      this.categorias=data['success']['products'];
     // HttpService.categorias=this.categorias;
      
      

    },
    (error) =>{ 
    console.error(error);
    });
  }

  cargarBanner()
  {

    this.HttpService.getBanner().subscribe((data) => 
    {

      this.myurl=this.HttpService.url+'/image/';
      
    this.banners = data['results'];



    },
    (error) =>{ 
    console.error(error);
    });
  }

  loginapi()
  {
  
  
    if (this.api_token)
    {
      this.cargarProductos();
      this.getcategorias();
 
    }
    else
    {
      this.HttpService.loginapi().subscribe((data) => 
      {
        this.api_token=data['api_token'];
        
         this.cargarProductos();
         this.getrate();


      },
      (error) =>{ 
      console.error(error);
      });
    }
}

  cargarProductos()
  {

    let urlapi=this.HttpService.url+"/index.php?route=api/custom/products&api_token="+this.api_token;
    this.HttpService.getProducts(urlapi).subscribe((data) => 
    {

    delete this.products;
    this.products=[];
    Object.keys(data).map(e => this.products.push(data[e]));

   for (let i=0; i<this.products.length;i+=1)
   {
    this.products[i].name=this.products[i].name.replace("&quot;",'"');
    this.products[i].name=this.products[i].name.replace("&amp;",'&');
    this.products[i].name=this.products[i].name.replace("&lt;",'<');
    this.products[i].name=this.products[i].name.replace("&gt;",'>');
    
    this.products[i].description=this.products[i].description.replace("&quot;",'"');
    this.products[i].description=this.products[i].description.replace("&amp;",'&');
    this.products[i].description=this.products[i].description.replace("&lt;",'<');
    this.products[i].description=this.products[i].description.replace("&gt;",'>');


   }
     this.aproducts=this.products;
    let nrows=0;
     //this.products.push(this.products);
    nrows=Math.ceil(this.products.length);
  this.losrows=nrows;
    let ni=0;
    for (let i = 0; i < nrows; i+=1) 
    { //iterate images
      if (this.products[ni])
{
      this.productsgrid[i]=new Array(2);
      
      this.productsgrid[i][0]=ni;
      ni++;
}     
      if (this.products[ni])
      {

        this.productsgrid[i][1]=ni;
        
      }
      ni++;
    }
    console.log('Banner:');
    console.log(this.banners);
    console.log('Productos:');
    console.log(this.products);

    },
    (error) =>{
    console.error(error);
    });
  }
  clearBusq(ev: any) {
 
    this.cargarProductos();

  }
 
  filterProducts(ev: any) {
    //this.cargarProductos();
    this.products=this.aproducts;
    let val = ev.target.value;
     if (val && val.trim() !== '') {
      this.products= this.products.filter(function(item) {
        console.log(item.name);
        console.log(item.name.toLowerCase().includes(val.toLowerCase()));
        return item.name.toLowerCase().includes(val.toLowerCase());
       
      });
      delete this.productsgrid;
      this.productsgrid=[];
      console.log(this.products);
      let nrows=0;
      nrows=Math.ceil(this.products.length/2);
    this.losrows=nrows;

    let ni=0;
    for (let i = 0; i < nrows; i+=1) 
    { //iterate images

      if (this.products[ni])
{
      this.productsgrid[i]=new Array(2);
      
      this.productsgrid[i][0]=ni;

      ni++;
}   
if (this.products[ni])
{
if (i<this.products.length)
      {

        this.productsgrid[i][1]=ni;
        
      }
      else{
        this.productsgrid[i][1]=0;}
      ni++;
    }
  }
{
  console.log('Filtrado:');
  console.log(this.products);
 
  console.log(this.productsgrid);
  this.products=this.aproducts;
}
    }


  }
  
  ionViewDidLoad()
  {
    
     console.log('Iniciando: hhhh');

 




        
  }
}
