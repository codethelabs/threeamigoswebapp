import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userinfo!:any;
  transactions!:any;
  cartitems!:any;
  totalAmount=0;  
  feedback = "";
  alert = "";
  cart!:any;
  constructor(private ms: MasterService, private router: Router, private location: Location){}

  ngOnInit(): void {
    this.ms.getUserDetails(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.userinfo = res.data
      }
    })
    
    this.ms.getUserTransactions(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.transactions = res.data
      }
    })

    this.ms.getUserCartItems(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.cart = res.data;
        this.totalAmount += res.data.totalAmount;
        this.cartitems = res.data.cartItems
      }
    })
    
  }

  update = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    address: new FormControl(),
    phone: new FormControl()
  })

  formatDate(date:any){
    return this.ms.formatOrdinalDate(date);
  }

  updateUserDetails(id:any){
    const data = {
      id: id,
      firstname:this.update.controls.firstname.value,
      lastname:this.update.controls.lastname.value,
      address:this.update.controls.address.value,
      phone:this.update.controls.phone.value,
    }
    this.ms.updateUserDetails(data).subscribe((res:any)=>{
      if(res.success){
        this.alert = "success"
        this.feedback = res.message
      }else{
        this.alert = "error"
        this.feedback = res.message
      }
    })

  }

  // checkout
  checkout(){
    if(this.userinfo.balance >=this.totalAmount){
      console.log(this.cart.id)
      this.ms.checkout(this.cart.id).subscribe((res:any)=>{
        if(res.success){
          window.location.reload();
        }
      })
      // this.ms.checkout()
    }else{
      alert(`Insufficient Balance. You need £${this.totalAmount-this.userinfo.balance} more.`)
    }
    
  }


  
  



  

}
