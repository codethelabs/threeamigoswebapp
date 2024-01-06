import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  products!:any[];
  status: String = ""

  // constructor
  constructor(private ms: MasterService, private router: Router){}

  // oninit
  ngOnInit(): void {
    this.ms.listAllProducts().subscribe((res:any)=>{
      if(res.success){
        this.products = res.data
      }else{
        this.status = "No Product found!"
      }
    })
    
  }

  truncateString(inputString: string, maxLength: number): string {
    if (inputString.length <= maxLength) {
        return inputString;
    } else {
        return inputString.substring(0, maxLength) + '...';
    }
  }

  viewProduct(id:any){
    this.router.navigate(['dashboard/view-product', id])
  }




}
