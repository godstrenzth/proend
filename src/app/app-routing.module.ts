import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CusComponent } from './page/cus/cus.component';
import { LoginComponent } from './page/login/login.component';
import { LogshopComponent } from './page/logshop/logshop.component';
import { OrdercusComponent } from './page/ordercus/ordercus.component';

import { ShopComponent } from './page/shop/shop.component';

const routes: Routes = [
  {path:'cus',component:CusComponent},
  {path:'shop',component:ShopComponent},
  {path:'login',component:LoginComponent},
  {path:'ordercus',component:OrdercusComponent},
  {path:'loginshop',component:LogshopComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
