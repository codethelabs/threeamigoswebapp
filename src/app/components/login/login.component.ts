import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/services/master.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private ms: MasterService, private router: Router){}



  alert: String = "";
  feedback: String = "";
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)    
  })

  loginUser(){
    if(this.loginForm.valid){
      let data = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      }
      this.ms.loginUser(data).subscribe((response:any)=>{
        if(response.success){
          localStorage.setItem("3ac-uid", response.userid)
          this.router.navigate(['/dashboard'])
        }else{
          this.alert = "error";
          this.feedback = response.message
        }
      })
      
    }else{
      this.alert = "error"
      this.feedback = "All Fields are Required!"
    }
  }

}
