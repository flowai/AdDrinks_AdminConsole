import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Observable<firebase.User>;

  loginData = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private toastCtrl: ToastController) { 
    this.user = afAuth.authState; 
  }
 
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        console.log("Login Granted"+ this.user);
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
          });
        toast.present();
        console.log(err.message);
      });
    // Login Code here
  }

  signup() {
    this.navCtrl.push(SignupPage, { email: this.loginData.email });
  }
}