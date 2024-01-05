// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLoggedIn() {
    const uid = localStorage.getItem('3ac-uid');
    if(uid && uid!=null &&uid!="" ){
        return true;
    }else{
        return false;
    }
  }
}
