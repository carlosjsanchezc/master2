import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpService} from '../providers/http-service';
//import { CartPopPage } from '../pages/cart-pop/cart-pop';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  api_token:string;
  pages: any[]=[];
  url="https://www.dc2.com.ve/opencart/upload";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public HttpService:HttpService) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.pages = [
        { title: 'My Page 1', component: HomePage}
        ,{ title: 'My Page 1', component: HomePage}      
    ];

    this.getcategorias()
    console.log('Paginas');
    console.log(this.pages);


    this.platform.ready().then(() => {
  
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  getcategorias()
  {

    let urlapi=this.HttpService.url+"/index.php?route=api/custom/categs&api_token="+this.api_token;
  
    this.HttpService.getCategorias(urlapi).subscribe((data) => 
    {
      console.log('Categorias');
      this.pages=[];
      console.log(data['success']);
      this.pages=data['success']['products'];
      this.pages.unshift({'name':'Login'});
      this.pages.unshift({'name':'Home'});
      
     // this.pages=data['success']['products'];
     // HttpService.categorias=this.categorias;
      
      

    },
    (error) =>{ 
    console.error(error);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
