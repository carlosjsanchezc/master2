import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,ModalController,MenuController,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { HttpService} from '../providers/http-service';
import { LoginModalPage } from '../pages/login-modal/login-modal';


import { OneSignal } from '@ionic-native/onesignal';


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
  onesignalkey='5915c91a-9dbe-48d3-9b0d-2d856aff9d82';
  appid='5915c91a-9dbe-48d3-9b0d-2d856aff9d82';
  v:any[]=[ ' '];
  url="https://elelook.com.ve";

  constructor(public platform: Platform,private alertCtrl: AlertController, public oneSignal:OneSignal,public menuCtrl: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen,public HttpService:HttpService,public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.handlerNotifications();
 
  }

  private handlerNotifications(){
   // this.oneSignal.setLogLevel({logLevel:5,visualLevel:5});
    this.oneSignal.startInit('5915c91a-9dbe-48d3-9b0d-2d856aff9d82', '739069976440');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.setSubscription(true);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
  }
  loginform()
  {
    let myModal = this.modalCtrl.create(LoginModalPage);
      console.log('click modal');
      myModal.present();
      myModal.onDidDismiss(data => {
        console.log('Saliendo');

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
