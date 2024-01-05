// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router){}
  
  isLoggedIn() {
    const uid = localStorage.getItem('3ac-uid');
    if(uid && uid!=null &&uid!="" ){
        return true;
    }else{
        return false;
    }
  }

  logout(){
    localStorage.removeItem('3ac-uid');
    this.router.navigate(['/login']);
    
  }
}
