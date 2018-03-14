import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductviewModalPage } from './productview-modal';

@NgModule({
  declarations: [
    ProductviewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductviewModalPage),
  ],
})
export class ProductviewModalPageModule {}
