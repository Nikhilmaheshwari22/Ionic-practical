import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public alertCtrl: AlertController, private toast : ToastController , public loadingController : LoadingController) { }


  async showAlert(title :string, message:string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToastMessage(message:any) {
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  async showLoader() {
    let loading = this.loadingController.create({
      message: 'Please wait...'
    });

    (await loading).present();
  }

  hideLoader() {
      this.loadingController.dismiss();
  }
}
