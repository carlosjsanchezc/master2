import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService 
{
 
  url="https://elelook.com.ve";
 // url="https://localhost/upload";
  categorias:any[]=[];
  isloging=false;
  api_token:string;
  customername:string;
  customerlastname:string;
  customertelephone:string;
  customeraddressid:number;
  customeraddress1:string;
  customeraddress2:string;
  customercompany:string;
  customercity:string;
  customercountry:string;
  customercountryid:string;
  customerpostcode:string;
  customerzone:string;
  customerzoneid:string;
  customeremail:string;

  constructor(
    private http: HttpClient
  ) {
    this.categorias=[
      { title: 'Productos' },
      { title: 'Vestidos' }
    ];


  }
  httpr(url) {

    return this.http.get(url);
  }

 getBanner() {

    return this.http.get(this.url+"/products.php?option=1");
  }
  getProducts(urlapi) {
    
    
    return this.http.get(urlapi);
 
  }  
  getCategorias(urlapi) {
    
    this.categorias=[
      { title: 'Productos' },
      { title: 'Vestidos' }
    ];
    return this.http.get(urlapi);
    
  }
  loginapi() 
  {
    
    return this.http.get(this.url+'/apiopencart.php');
  }

   

}
