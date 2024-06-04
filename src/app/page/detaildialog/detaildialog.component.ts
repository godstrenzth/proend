import { HttpClient } from '@angular/common/http';
import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { Convert as userCVT,User } from 'src/app/model/user.model';
@Component({
  selector: 'app-detaildialog',
  templateUrl: './detaildialog.component.html',
  styleUrls: ['./detaildialog.component.scss']
})


export class DetaildialogComponent {
  user1=Array<User>()
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,private http:HttpClient,private dataS:DataService)
  {
    this.http.get(this.dataS.apiPJ+"/users/id/5").subscribe((data:any)=>
      {
        this.user1=userCVT.toUser(JSON.stringify(data))
        console.log(this.user1)
      })

  }
  calculateAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const millisecondsDiff = today.getTime() - birthDateObj.getTime();
    const ageInYears = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24 * 365));
    return ageInYears;
  }

}
