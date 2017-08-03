import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from "@angular/http";  
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;

  oUser: Observable<firebase.User>;
  user: string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private http: Http) {
    this.oUser = afAuth.authState;
    afAuth.authState.subscribe((oUser: firebase.User) => {
      this.user = oUser.displayName;
    });

   this.http.get("https://us-central1-addrink-45eb9.cloudfunctions.net/getCaps")
      .map(result => result.json())
      .subscribe(result => {
         this.items = result;
           console.log(result);
         }, error => {
           console.error(error);
      });
  }

}