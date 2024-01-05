import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient){}

  baseurl = "http://localhost:3000/api";

  registerUser(data:any){
    return this.http.post(this.baseurl+'/addUser', data);
  }

  loginUser(data:any){
    return this.http.post(this.baseurl+'/login', data);
  }

}
