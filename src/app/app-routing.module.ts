import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { ForgetComponent } from './page/forget/forget.component';
import { ResetComponent } from './page/reset/reset.component';
import { HomeComponent } from './page/home/home.component';
import { CompetitionComponent } from './page/competition/competition.component';

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'forget',component:ForgetComponent},
  {path: 'reset',component:ResetComponent},
  {path: 'home',component:HomeComponent},
  {path: 'compete',component:CompetitionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
