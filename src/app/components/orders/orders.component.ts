import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders!:any;
  // constructor
  constructor(private ms: MasterService, private router: Router){}
  // ngoninit
  ngOnInit(): void {
    // list all the orders - processing, dispatched, 
    this.ms.getUserOrders(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.orders = res.data
      }
    })
  }

  viewProduct(id:any){
    this.router.navigate(['dashboard/view-product', id])
  }

}
