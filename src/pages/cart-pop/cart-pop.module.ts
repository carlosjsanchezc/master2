import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {CartPopPage } from './cart-pop';

@NgModule({
  declarations: [
    CartPopPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPopPage),
  ],
})
export class EventModalPageModule {}
