import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ModalController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { HttpService} from '../providers/http-service';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { ProductModalPage } from '../pages/product-modal/product-modal';
import { CartPopPage } from '../pages/cart-pop/cart-pop';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  showSubmenu: boolean = false;
  rootPage: any = HomePage;
  api_token:string;
  pages: any[]=[];
  showLevel1 = null;
  showLevel2 = null;
  usuario:string;

  v:any[]=[ ' '];
  url="https://elelook.com.ve";

  constructor(public platform: Platform,public menuCtrl: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen,public HttpService:HttpService,public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  loginform()
  {
    let myModal = this.modalCtrl.create(LoginModalPage);
      console.log('click modal');
      myModal.present();
      myModal.onDidDismiss(data => {
        console.log('Saliendo');

        this.usuario=data['email'];
        });
  }

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };

  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };
  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };
  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };

menuItemHandler() {
  this.showSubmenu = !this.showSubmenu;
}
  initializeApp() {
    this.pages = [     
    ];
    this.v=[];
    this.HttpService.loginapi().subscribe((data)=>
    {
      this.api_token=data['api_token'];
      this.getcategorias()
      console.log('Paginas');
      console.log(this.pages);
      console.log(data);

    },(error) =>{ 
      console.error(error);
      });




    this.platform.ready().then(() => {
  
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  pushpage(categid)
  {
    console.log(categid);
    this.nav.push(HomePage, {
      categid: categid
  });
  this.menuCtrl.close();

  }
  getcategorias()
    {
      
    let urlapi=this.url+"/index.php?route=api/custom/categs&api_token="+this.api_token;
  
    this.HttpService.getCategorias(urlapi).subscribe((data) => 
    {
      console.log('Categorias');
      this.pages=[];
      console.log(data['success']);
      this.pages=data['success']['products'];
      console.log('Categorias');
      console.log(this.pages);
      
      
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
