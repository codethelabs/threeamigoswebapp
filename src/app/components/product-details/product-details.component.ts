import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId:String = "";
  productDetails!:any;
  constructor(private route: ActivatedRoute, private ms: MasterService){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.ms.getProductDetails(this.productId).subscribe((res:any)=>{
      if(res.success){
        this.productDetails = res.data
      }
    })



  }


}
