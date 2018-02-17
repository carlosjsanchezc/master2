import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpService}  from '../providers/http-service'
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginModalPage } from '../pages/login-modal/login-modal';
//import { OneSignal } from '@ionic-native/onesignal';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CartPopPage } from '../pages/cart-pop/cart-pop';
import { ProductModalPage } from '../pages/product-modal/product-modal';
import { ImagenModalPage } from '../pages/imagen-modal/imagen-modal';

import { OneSignal } from '@ionic-native/onesignal';



@NgModule({
  declarations: [
    MyApp,
    HomePage,

    CartPopPage,
    ImagenModalPage,
    LoginModalPage,
    ProductModalPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
			platforms: {
				ios: {
					backButtonText: 'Volver'
				}
			}
		}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

    CartPopPage,
    LoginModalPage,
    ImagenModalPage,
    ProductModalPage
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
