// register.component.ts
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // constructor
  constructor(private ms: MasterService, private router: Router){}
  // properties
  selectedEntity: string = 'user';
  feedback!: string;
  alert: String = "";

  registrationForm = new FormGroup({
    selectedEntity: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    cpassword: new FormControl('', [Validators.required]),
  });

  passwordMatch(): boolean {
    return this.registrationForm.get('cpassword')?.value === this.registrationForm.get('password')?.value;
  }

  passwordMatchValidator(): { [key: string]: boolean } | null {
    const password = this.registrationForm.controls.password!.value;
    const cpassword = this.registrationForm.controls.cpassword!.value;

    if (password && cpassword && password !== cpassword) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
  // naviage to login
  loginPage(){
    this.router.navigate(['/login'])
  }

  // register the user
  registerUser() {
    if(this.passwordMatch()){
      if(this.registrationForm.valid){
        
        let data = {
          firstname: this.registrationForm.controls.firstname.value,
          lastname: this.registrationForm.controls.lastname.value,
          phone: this.registrationForm.controls.phone.value,
          address: this.registrationForm.controls.address.value,
          email: this.registrationForm.controls.email.value,
          password: this.registrationForm.controls.password.value,
          supplier:this.registrationForm.controls.selectedEntity.value == "supplier"? true: false,
          staff: this.registrationForm.controls.selectedEntity.value == "staff"? true: false
        }
        this.ms.registerUser(data).subscribe((response:any)=>{
          if(response.success){
            this.router.navigate(['/login'])
          }else{
            this.alert = "error"
            this.feedback = response.message
          }
        })
        
      }else{
        this.alert = "error"
        this.feedback = "Check the form for errors"
      }
    }else{
      this.alert = "error"
      this.registrationForm.controls.cpassword.setErrors({'passwordMismatch':true})
      this.feedback = "Password mismatch!"
    }
  }
}
