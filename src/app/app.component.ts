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
  submenus:any[]=[];
  showsubmenus:any[]=[];
  rootPage: any = HomePage;
  api_token:string;
  pages: any[]=[];
  showLevel1 = null;
  showLevel2 = null;
  usuario:string;
  superusuario:boolean;
  contactanos:boolean=false;
  onesignalkey='5915c91a-9dbe-48d3-9b0d-2d856aff9d82';
  appid='5915c91a-9dbe-48d3-9b0d-2d856aff9d82';
 
  v:any[]=[ ' '];
  url="https://elelook.com.ve";

  constructor(public platform: Platform,private alertCtrl: AlertController, public oneSignal:OneSignal,public menuCtrl: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen,public HttpService:HttpService,public modalCtrl: ModalController) {
    this.initializeApp();
    this.superusuario=false;
    // used for an example of ngFor and navigation
    this.handlerNotifications();
 
  }



  private handlerNotifications(){
    /*
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
    this.oneSignal.endInit();*/
  }

  vercontacto(){
    this.contactanos=!this.contactanos;
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Enviar Mensaje Masivo',
      message: "Introduzca Titulo y mensaje",
      inputs: [
        {
          name: 'title',
          placeholder: 'Título'
        },
        {
          name: 'msj',
          placeholder: 'Mensaje'
          
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Saved clicked');

            let urlapi="http://www.elelook.com.ve/apionesignal.php?msj="+data['msj']+"&titulo="+data['title'];
 
    
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
        }
      ]
    });
    prompt.present();
  }

  loginform()
  {
    let myModal = this.modalCtrl.create(LoginModalPage);
      console.log('click modal');
      myModal.present();
      myModal.onDidDismiss(data => {
        console.log('datos del modal');
        console.log(data);
        if (data){
          this.superusuario=data['superuser'];
          this.usuario=data['firstname']+' '+data['lastname'];
        
        }
        console.log('Saliendo');

        });
  }


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

    },(error) =>{ 
      console.error(error);
      });
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }
  cambiasubmenu(i){
    this.showsubmenus[i]=!this.showsubmenus[i];
  }
  pushpage(categid,name)
  {
    console.log(categid);
    this.nav.push(HomePage, {
      categid: categid, name:name
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
      for (let index = 0; index < this.pages.length; index++) {
        this.submenus[index]=false;
        this.showsubmenus[index]=false;
        if (this.pages[index].parents.length>0){
          this.submenus[index]=true;
        }

        
      }
      console.log(this.submenus);
      
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
