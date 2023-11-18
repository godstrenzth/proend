import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private rou:Router)
  {
    // http.get(dataser.apiPJ+"/product").subscribe((data:any)=>
    // {
    //   this.prodS=productCVT.toProduct(JSON.stringify(data))
    //   console.log(this.prodS)
    // })
    // this.Cus=dataser.cid
  }
  forget()
  {
    this.rou.navigateByUrl('/forget')
  }
  register()
  {
    this.rou.navigateByUrl('/register')
  }


}
