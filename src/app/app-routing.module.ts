import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './components/market/market.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'market', component: MarketComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'addProduct', component: AddProductComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},


  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
