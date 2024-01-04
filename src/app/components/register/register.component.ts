// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  selectedEntity: string = 'user';

  registrationForm = new FormGroup({
    userField: new FormControl(''),
    selectedEntity: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    supplierField: new FormControl(''),
    ownerField: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
    // userField: new FormBuilder('')



  })


}
