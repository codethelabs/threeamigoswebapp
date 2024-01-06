// add-product.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MasterService } from 'src/app/services/master.service';
import { ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  imagePreview: SafeUrl | null = null;
  alert:String = ""
  feedback:String = ""
  @ViewChild('productpic') productpic!: ElementRef<HTMLInputElement>;
  serverImage: String = "";

  addProductForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stockQuantity: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    productpic: new FormControl(),

  });

  constructor(private sanitizer: DomSanitizer, private ms: MasterService) {}

  ngOnInit(): void {
  }

  uploadButtonClick() {
    if (this.productpic) {
      this.productpic.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const fileInput = this.productpic?.nativeElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.readFileAsBase64(file);
    }
  }

  readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Set the image preview using the sanitized URL
      this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  clearFile() {
    // Clear the selected file and image preview
    this.addProductForm.get('productpic')?.setValue(null);
    this.imagePreview = null;
    const fileInput = document.getElementById('productpic') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  addProduct(){
    if(this.addProductForm.valid){
      const productdata = new FormData();
      productdata.append('productname', this.addProductForm.controls.productName.value!);
      productdata.append('description', this.addProductForm.controls.description.value!);
      productdata.append('price', this.addProductForm.controls.price.value!);
      productdata.append('quantity', this.addProductForm.controls.stockQuantity.value!);
      productdata.append('category', this.addProductForm.controls.category.value!);
      productdata.append('brand', this.addProductForm.controls.brand.value!);
      productdata.append('supplier', localStorage.getItem('3ac-uid')!)

      const fileInput = this.productpic?.nativeElement;
      if (fileInput && fileInput.files?.length) {
        const selectedFile = fileInput.files[0];
        productdata.append('productpic', selectedFile);
      }

      // productdata.forEach((value, key)=>{
      //   console.log(key, value)
      // })

      this.ms.addProduct(productdata).subscribe((res:any)=>{
        if(res.success){
          this.feedback =res.message
          this.alert = "success"
          this.serverImage = res.data.images[0];
        }else{
          this.feedback = res.message
          this.alert = "error"
        }
      })

      

    }
  }

  

  
}
