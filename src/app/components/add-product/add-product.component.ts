// add-product.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm = new FormGroup({
    productName: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    stockQuantity: new FormControl(),

  });

  constructor() {}

  ngOnInit(): void {
  }

  

  
}
