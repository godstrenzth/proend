import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent {

  // a2: any[] = [];

  a1=new Array<any>
  sta:any

  nodata:any



  constructor(private rou:Router,private dataS:DataService,private http:HttpClient)
  {
    this.sta="1";
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


  async log12(id:any,pass:any)
  {
    if(id==""||pass=="")
      {
        this.nodata = true;

      }
    else{
      let jin={
        email: id,
        password:pass

      }
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/login",jin,
      {


      }))
      if(data >= 0){
        console.log(data)
        console.log(id+"|"+pass+"|"+this.sta)
        if(this.sta != undefined)
        {
          localStorage.setItem('uid',data)
          localStorage.setItem('status',this.sta)
          this.rou.navigateByUrl('/home')

        }


      }
      else{

        this.nodata = true;
      }
    }





  }
  Chnodata()
  {

    this.nodata = false;
  }



}
