import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpService} from '../providers/http-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  api_token:string;
  pages: Array<{title: string, component: any}>;
  url="https://www.dc2.com.ve/opencart/upload";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public HttpService:HttpService) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.pages = [
      { name: 'Home', component: HomePage },
      { name: 'List', component: ListPage }
    ];
    console.log('Paginas');
console.log(this.pages);
    this.platform.ready().then(() => {
  
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
