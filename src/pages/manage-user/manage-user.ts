import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastService } from '../../providers/toastService';
/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-user',
  templateUrl: 'manage-user.html',
})
export class ManageUserPage {
  private todouser = <any>{};
  public key_user;
  private title : string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fdb : AngularFireDatabase,
    private toastService: ToastService,
    ) {
      this.key_user = navParams.get("key_user");
 
  }


  
  add_firebase(){  
    /////////กรณี  v.5.0  (ใช้งานได้)////////
    const afList = this.fdb.list('/all_user/');
    afList.push({ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe(); 
  }

  delete_firebase (item){
    
    console.log('remove key : '+item);
    this.fdb.list("/all_user/").remove(item);
  }

  update_firebase(item_key){
    console.log('key :'+item_key+' data'+this.todouser);
    console.log(this.fdb.list("/all_user/").update(item_key,{ fname: this.todouser.fname_update,lname: this.todouser.lname_update,number_id: this.todouser.number_id,phone: this.todouser.phone  }));
    this.toastService.Update_Toast();
  }




  ionViewDidLoad() {

    let elem_save = <HTMLElement>document.querySelector(".button_save");
    let elem_update = <HTMLElement>document.querySelector(".button_update");

    if(this.key_user==null){
      this.title = "ADD USER";
      elem_update.style.display = 'none';
      elem_save.style.display = 'flex';

      
    }
    else{
      console.log('user_key:'+this.key_user);    
      this.title = "EDIT USER";
      elem_update.style.display = 'flex';
      elem_save.style.display = 'none';
     
  
   
        this.fdb.list('/all_user/', ref => ref.orderByKey().equalTo(this.key_user)).valueChanges().subscribe(_data=>{
          console.log(_data);
          var myJSON = JSON.parse(JSON.stringify(_data));
          console.log(myJSON[0].fname);
    
          this.todouser.fname_update =myJSON[0].fname;
          this.todouser.lname_update =myJSON[0].lname;
          this.todouser.number_id =myJSON[0].number_id;
          this.todouser.phone =myJSON[0].phone;
    
          });
      


    }

  }


}
