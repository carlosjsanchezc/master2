import { Component } from '@angular/core';
import { NavParams, NavController,LoadingController,ModalController, AlertController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service'

import { CartPopPage} from '../cart-pop/cart-pop';
import { ProductModalPage } from '../product-modal/product-modal';
import { AtencionModalPage } from '../atencion-modal/atencion-modal';
import { ReviewModalPage } from '../review-modal/review-modal';
//import { ImagenModalPage } from '../imagen-modal/imagen-modal';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banners:any[] = [];
  products:any[] = [];
  aproducts:any[] = [];
  categorias:any[]=[];
  currency:string;
  rate:number;
  countcart=0;
  losrows=0;
  accion='';
  categname:string;
  productsgrid:any[]=[];
  categid:number;
  myurl="https://elelook.com.ve";
  myurl2="https://elelook.com.ve/image";

  public api_token:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public HttpService:HttpService,public loadingCtrl: LoadingController,public modalCtrl: ModalController, public alertCtrl:AlertController) {
    this.api_token='';
    this.rate=0;
    this.loginapi();
    this.cargarBanner();
    this.categid=0;
    this.categid=this.navParams.get('categid');
    this.categname=this.navParams.get('name');
    
    if (this.categid)
    {
      console.log('Categid:'+this.categid.toString());

    }
    //this.presentLoading();

  }
  reviewproduct(id_producto,i)
  {
    let data={nombre:this.products[i].name,imagen:this.myurl+this.products[i].image, idproducto:id_producto,api_token:this.api_token};
    let myModal = this.modalCtrl.create(ReviewModalPage,data);
    console.log('click modal');
    myModal.present();
    console.log('Modal presentado');
    

    myModal.onDidDismiss(data => {
      console.log('Saliendo');

    });
  }
  gohome()
  {
    console.log('Gogo');
    this.navCtrl.setRoot(HomePage);

  }
verproducto(product_id,price,image,name)
{
  console.log('name:'+name);
  let data={api_token:this.api_token, url:this.myurl, rate:this.rate,  currency:this.currency,product_id:product_id,price:price,image:image,name:name};
  console.log(data);
  let myModal = this.modalCtrl.create(ProductModalPage,data);
  console.log('click modal');
  myModal.present();
  console.log('Modal Producto');
  

  myModal.onDidDismiss(data => {
    console.log('Saliendo');
    this.countercarro();
    
    });
}
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 2000
    });
    loader.present();
    
  }
  refresh()
  {
    this.loginapi();
  }
  getrate()
  {
    let urlapi=this.myurl+"/index.php?route=api/custom/ratecurrency&api_token="+this.api_token;
 
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      if (data['error']){
        this.loginapi();
      }
      console.log(this.api_token);
      console.log('url:'+urlapi);
      console.log(data);
      this.rate=data['value'];
      this.currency=data['symbol_left'];
      //this.rate=data['value'];
    },
    (error) =>{ 
      this.accion='Error al cargar moneda Bs'+JSON.stringify(error);
    console.error(error);
    this.loginapi();
    
    });

  }

  countercarro()
  {

    let urlapi=this.myurl+"/index.php?route=api/custom/vproductscart&api_token="+this.api_token;
    console.log(urlapi);
    console.log('COntando Items');
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      this.countcart=0;
      if (data['error']){
        this.loginapi();
      }
      console.log(data);
      if (data['results'])
      {
      this.countcart=data['results'].length;
      }

    },
    (error) =>{ 
      this.loginapi();
    
      console.log('error');
    });

  }

  agregacarro(product_id,quantity)
  {
    this.accion='Agregando a carro..';

    //let urlapi=this.HttpService.url+"/index.php?route=api/custom/products&api_token="+this.api_token;
    let option="[]";
    let micadena="&quantity="+quantity+"&product_id="+product_id+"&option="+option;
    let urlapi=this.myurl+"/index.php?route=api/custom/addproductscart&api_token="+this.api_token+micadena;
    console.log(urlapi);
    
    this.HttpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(this.api_token);
      if (data['error']){
        this.loginapi();
      }
      this.accion='Item agregado con exito';
      this.countercarro();
      

    },
    (error) =>{ 
      this.loginapi();
    
      this.accion=urlapi+'- item:'+JSON.stringify(error);
    console.error(error);
    let loader = this.loadingCtrl.create({
      content:'No hay conexión de datos!',
      duration: 2000
    });
    loader.present();
    });

  }

  vercarro()
  {

      console.log('Modal');
      console.log(this.api_token);
      console.log(this.myurl);

console.log('Rate:'+this.rate.toString());
console.log('Symbol'+this.currency);
    
      let myModal = this.modalCtrl.create(CartPopPage,{api_token:this.api_token, url:this.myurl, rate:this.rate,  currency:this.currency});
      console.log('click modal');
      myModal.present();
      console.log('Modal presentado');
      
  
      myModal.onDidDismiss(data => {
        console.log('Saliendo');
        this.countercarro();
        
        });
 
  }

  veratencion()
  {
    let myModal = this.modalCtrl.create(AtencionModalPage);
    console.log('click modal');
    myModal.present();
    
  }
  
  getcategorias()
  {

    let urlapi=this.HttpService.url+"/index.php?route=api/custom/categs&api_token="+this.api_token;
 
    
    this.HttpService.getCategorias(urlapi).subscribe((data) => 
    {
      if (data['error']){
        this.loginapi();
      }
      console.log('Categorias');
      this.categorias=[];
      console.log(data['success']);
      this.categorias=data['success'];
      for (let i=0; i<this.categorias.length;i+=1)
   {
    this.categorias[i].name=this.categorias[i].name.replace("&quot;",'"');
    this.categorias[i].name=this.categorias[i].name.replace("&amp;",'&');
    this.categorias[i].name=this.categorias[i].name.replace("&lt;",'<');
    this.categorias[i].name=this.categorias[i].name.replace("&gt;",'>');



   }
     // HttpService.categorias=this.categorias;
      
      

    },
    (error) =>{ 
      this.loginapi();
    
    console.error(error);
    });
  }

  cargarBanner()
  {
    
    this.HttpService.getBanner().subscribe((data) => 
    {

      this.myurl2="https://elelook.com.ve/image/";
      
    this.banners = data['results'];



    },
    (error) =>{ 
    console.error(error);
    });
  }

  loginapi()
  {
  

      this.HttpService.loginapi().subscribe((data) => 
      {
        this.api_token=data['api_token'];
        this.HttpService.api_token=this.api_token;
        this.getrate();
         this.cargarProductos();
       


      },
      (error) =>{ 
      console.error(error);
      });

}

  cargarProductos()
  {
    let urlapi=this.HttpService.url+"/index.php?route=api/custom/products&api_token="+this.api_token;
    
    if (this.categid)
    {   console.log('Entro a categorías');
    console.log(this.categid);
        urlapi=this.HttpService.url+"/index.php?route=api/custom/productscateg&api_token="+this.api_token+"&categid="+this.categid;
    
    }
    this.HttpService.getProducts(urlapi).subscribe((data) => 
    {
      if (data['error']){
        this.loginapi();
      }
    delete this.products;
    this.products=[];
    Object.keys(data).map(e => this.products.push(data[e]));

   for (let i=0; i<this.products.length;i+=1)
   {
    this.products[i].name=this.products[i].name.replace("&quot;",'"');
    this.products[i].name=this.products[i].name.replace("&amp;",'&');
    this.products[i].name=this.products[i].name.replace("&lt;",'<');
    this.products[i].name=this.products[i].name.replace("&gt;",'>');
    this.products[i].price=Number(this.products[i].price)*this.rate;
    
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
      console.log('Productos Filtrados:')
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

}
    }


  }
  
  ionViewDidLoad()
  {
    
     console.log('Iniciando: hhhh');

 




        
  }
}
