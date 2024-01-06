import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient){}
  // https://3acs-server.azurewebsites.net/
  baseurl = "https://3acs-server.azurewebsites.net/api";

  registerUser(data:any){
    return this.http.post(this.baseurl+'/addUser', data);
  }

  loginUser(data:any){
    return this.http.post(this.baseurl+'/login', data);
  }

  addProduct(data:FormData){
    return this.http.post(this.baseurl+'/addProduct', data);
  }

  addFunds(data:any){
    return this.http.post(this.baseurl+'/addFunds', data);
  }

  getUserDetails(userid:any){
    return this.http.get(this.baseurl+'/getUser/'+userid);
  }
  listAllProducts(){
    return this.http.get(this.baseurl+'/getAllProducts');
  }
  getProductDetails(id:any){
    return this.http.get(this.baseurl+'/getProductDetails/'+id);
  }

}
