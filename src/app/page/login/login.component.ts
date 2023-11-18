import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  da=this.data.cid
  constructor(private data:DataService ,private http:HttpClient,private rou:Router)
  {

    if(this.da != undefined){
      window.location.reload()
      console.log(this.da)



    }

  }
  async go(id1:any,pass1:any)
  {
    let a:any
    let LOG={
      username:id1,
      password:pass1
    }
    let data:any= await lastValueFrom(this.http.post(this.data.apiPJ+"/login",LOG,
    {

    }))

    this.data.cid= data[1]
    if(data[0]=="login Success"){
      this.rou.navigateByUrl('/cus')
    }
    else{
      // <c-alert color="warning">A simple warning alert—check it out!</c-alert>
      alert("Login fail");
    }

  //   let a:any
  //   let LOG={
  //     username:id1,
  //     password:pass1
  //   }

  //   let data= new Array<any>= await lastValueFrom(this.http.post(this.data.apiPJ+"/login",LOG,
  //   {

  //   }))
  //   if(data[0]=="login Success"){
  //     this.rou.navigateByUrl('/cus')
  //   }
  //   else{
  //     // <c-alert color="warning">A simple warning alert—check it out!</c-alert>
  //     alert("Login fail");
  //   }

  }

}