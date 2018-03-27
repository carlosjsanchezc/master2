import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HttpService} from '../../providers/http-service';
/**
 * Generated class for the ReviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review-modal',
  templateUrl: 'review-modal.html',
})
export class ReviewModalPage {
  nombreproducto:string;
  imagenproducto:string;
  idproducto:string;
  api_token:string;
  rating:number;
  autor:string;
  texto:string;
  reviews:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public httpService:HttpService, public alrtCtrl:AlertController) {

    this.nombreproducto= this.navParams.get('nombre');
    this.imagenproducto=this.navParams.get('imagen');
    this.idproducto=this.navParams.get('idproducto');
    this.api_token=this.httpService.api_token;
    this.cargarreviews();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewModalPage');
  }

  colocareview()
  {
    let urlapi=this.httpService.url+"/index.php?route=api/custom/addreview&api_token="+this.api_token+"&id_producto="+this.idproducto+"&autor="+this.autor+"&texto="+this.texto+"&rating="+this.rating;
    this.httpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(data);
      this.reviews=data['results'];
 
      },
      (error) =>{ 
      console.error(error);
      let alert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();
      });

  }
  cargarreviews()
  {

    let urlapi=this.httpService.url+"/index.php?route=api/custom/getreviews&api_token="+this.api_token+"&id_producto="+this.idproducto;
    this.httpService.httpr(urlapi).subscribe((data) => 
    {
      console.log(data);
      this.reviews=data['results'];
 
      },
      (error) =>{ 
      console.error(error);
      let alert = this.alrtCtrl.create({
        title: 'Error',
        subTitle: 'Error:'+JSON.stringify(error),
        buttons: ['Dismiss']
      });
      alert.present();
      });

  }

  

  closeModal() {
    this.viewCtrl.dismiss();
  }
  cancel() {
    this.viewCtrl.dismiss();
  }
}
