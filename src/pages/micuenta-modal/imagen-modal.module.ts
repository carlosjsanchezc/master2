import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagenModalPage } from './imagen-modal';

@NgModule({
  declarations: [
    ImagenModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagenModalPage),
  ],
})
export class ImagenModalPageModule {}
