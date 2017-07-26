import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupData = {
    email: '',
    password: '',
    passwordRetyped: ''
  };
 
  constructor(private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {
    
    this.signupData.email = this.navParams.get('email');
  }
 
  signup() {
    if(this.signupData.password !== this.signupData.passwordRetyped) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Please retype your password. The entered one does not match to the reentered one.',
	      buttons: ['OK']
      });
      alert.present();
      return;
    }

      this.afAuth.auth.createUserWithEmailAndPassword(this.signupData.email, this.signupData.password)
      .then(auth => {
        console.log(auth);
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: error.message,
          buttons: ['OK']
        });
        alert.present;
      });
  }
}