import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userType:String = "User Dashboard"
  isStaff:boolean = false;
  isSupplier:boolean = false;
  username!: String;

  constructor(private ms: MasterService, private auth: AuthService){}

  ngOnInit(): void {
    // get the user details
    this.ms.getUserDetails(localStorage.getItem('3ac-uid')).subscribe((res:any)=>{
      if(res.success){
        this.isSupplier = res.data.supplier;
        this.isStaff = res.data.staff
        this.username = this.capitalizeEachWord(res.data.firstname +' '+res.data.lastname);

        if(res.data.supplier){
          this.userType = "Supplier Dashboard"
        }
        if(res.data.staff){
          this.userType = "Staff Dashboard"
        }

        if(!res.data.staff && !res.data.supplier){
          this.userType = "User Dashboard"
        }

      }
    })
  }


  // other methods
  capitalizeEachWord(inputString: string): string {
    return inputString
      .split(' ') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the array back into a string
  }
  
  // logout
  logout(){
    this.auth.logout();
  }



}
