import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;

  oUser: Observable<firebase.User>;
  user: string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth) {
    this.oUser = afAuth.authState;
    afAuth.authState.subscribe((oUser: firebase.User) => {
      this.user = oUser.displayName;
    });

    this.items = [{ name: "test"}, {name : "test2"}];
  }

}
