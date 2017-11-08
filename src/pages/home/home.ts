import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Headers, Http } from "@angular/http";  
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any;
  keys: String[];

  oUser: Observable<firebase.User>;
  user: string;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private http: Http, private alertCtrl: AlertController) {
    this.oUser = afAuth.authState;
    afAuth.authState.subscribe((oUser: firebase.User) => {
      this.user = oUser.displayName;
    });

   this.http.get("https://us-central1-addrink-45eb9.cloudfunctions.net/getCapsFull")
      .map(result => result.json())
      .subscribe(result => {
         this.items = result;
         this.keys = Object.keys(this.items);
           console.log(result);
         }, error => {
           console.error(error);
      });
  }

  deleteEntry(event) {
    let id = event.target.parentElement.getAttribute("id");
    console.log(id);

    let headers = new Headers({'Content-Type': 'application/json'});

    this.http.post("https://us-central1-addrink-45eb9.cloudfunctions.net/deleteCaps", { "id" : id}, {headers : headers})
    .toPromise()
    .catch(this.handleError);
  }

  addEntry(event) {
    console.log("add Entry pressed");
    let alert = this.alertCtrl.create({
      title: 'create Entity',
      message: 'create a new Entry',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
        },
        {
          name: 'Stock',
          placeholder: 'Stock'
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'create',
          handler: data => {
            let headers = new Headers({'Content-Type': 'application/json'});
            let updateData = JSON.stringify({
                 name: data.Name,
                stock: data.Stock
               });
            this.http.put("https://us-central1-addrink-45eb9.cloudfunctions.net/addCaps", updateData, {headers: headers})
              .toPromise()
              .then(() => updateData)
              .catch(this.handleError);
          }          
        }
      ]
    });
    alert.present();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

  doRefresh(event){
     console.log('Begin async operation', event);

    setTimeout(() => {
      this.getAllData();
      event.complete();
    }, 1000);
  }

  private getAllData() {
    this.http.get("https://us-central1-addrink-45eb9.cloudfunctions.net/getCapsFull")
      .map(result => result.json())
      .subscribe(result => {
         this.items = result;
         this.keys = Object.keys(this.items);
           console.log(result);
         }, error => {
           console.error(error);
      });   
  }

}