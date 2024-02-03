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

  // a2: any[] = [];

  a1=new Array<any>



  constructor(private rou:Router)
  {
    // http.get(dataser.apiPJ+"/product").subscribe((data:any)=>
    // {
    //   this.prodS=productCVT.toProduct(JSON.stringify(data))
    //   console.log(this.prodS)
    // })
    // this.Cus=dataser.cid
    this.a1.push('a1','a2','a3','a4','a5','a6','a7','a8','a9','a10');

    // this.a1.splice(5, 1);
    while (this.a1.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.a1.length);
      console.log("del"+this.a1[randomIndex])
      this.a1.splice(randomIndex, 1);
    }

    console.log(this.a1)

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
