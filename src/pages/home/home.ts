import { Component } from '@angular/core';
import { NavController, Slides,LoadingController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service'
import { MyApp } from '../../app/app.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  banners:any[] = [];
  products:any[] = [];
  aproducts:any[] = [];
  categorias:any[]=[];
  losrows=0;
  productsgrid:any[]=[];
  myurl:string;
  api_token:string;
  constructor(public navCtrl: NavController, public HttpService:HttpService,public loadingCtrl: LoadingController) {
    this.api_token='';
    this.loginapi();
    this.cargarBanner();
    this.presentLoading();

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere...",
      duration: 10000
    });
    loader.present();
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
         this.getcategorias();

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
    this.cargarProductos();
    let val = ev.target.value;
     if (val && val.trim() !== '') {
      this.products= this.products.filter(function(item) {

        return item.name.toLowerCase().includes(val.toLowerCase());
       
      });
      delete this.productsgrid;
      this.productsgrid=[];

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

    }


  }
  
  ionViewDidLoad()
  {
    
     console.log('Iniciando: hhhh');

 




        
  }
}
