import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';

//import { ToastService } from '../../providers/toastService';

import { ManageUserPage } from '../manage-user/manage-user'

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class user  {
  public firstParam;
  public secondParam; 
  user_all= [];
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform: Platform, 
     //private toastService: ToastService,
     private manage_user :ManageUserPage,
     public fdb : AngularFireDatabase){
 
    this.firstParam = navParams.get("firstPassed");
    this.secondParam = navParams.get("secondPassed");
   // HomePage.checkhome();
  

              
          this.fdb.list('/all_user/').snapshotChanges().map(actions => {
            this.user_all = actions.map(action => ({ key: action.key, ...action.payload.val() }));
        }).subscribe(items => {
            //return items.map(item => item.key);
        });
        
        /////////กรณี แบบเดิม  v.4.0  (ใช้ไม่ได้แล้ว)////////
        /*  this.fdb.list('/all_user/').valueChanges().subscribe(_data=>{

          this.user_all = _data;
          console.log(this.user_all);
        }); */
        
  }

 
  Register() {
    this.navCtrl.push(ManageUserPage, {
      firstPassed: "ADMIN1",
      secondPassed: "ADMIN2"
    })
  }

  edit_user(key) {
    this.navCtrl.push(ManageUserPage, {
      key_user: key,
    
    })
  }

 this.manage_user.delete_firebase()

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherPage');
  }
 
  goBack() {
    console.log("popping");
    this.navCtrl.pop();
    
  }
}