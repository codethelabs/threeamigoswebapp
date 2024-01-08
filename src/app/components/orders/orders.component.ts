import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders!:any;
  // constructor
  constructor(private ms: MasterService){}
  // ngoninit
  ngOnInit(): void {
    // list all the orders - processing, dispatched, 
    this.ms.getUserOrders(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.orders = res.data
      }
    })
  }

}
