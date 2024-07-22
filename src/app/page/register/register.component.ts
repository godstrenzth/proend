import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Convert as userCVT,User } from 'src/app/model/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nodata:any
  minDate: Date;
  maxDate: Date;
  noregis:any
  noemail:any

  userS=Array<User>()
  constructor(private rou:Router,private dataS:DataService,private http:HttpClient)
  {

    this.http.get(this.dataS.apiPJ+"/users").subscribe((data:any)=>
      {
        this.userS=userCVT.toUser(JSON.stringify(data))
        console.log(this.userS)
      })



    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 1);
    this.maxDate = new Date(currentYear + 0, 11, 31);

  }
  login()
  {
    this.rou.navigateByUrl('/login')
  }

  async register(name:any,email:any,password1:any,phone:any,date:any,gender:any,idcard:any)
  {
    console.log(name+"|"+email+ "| " + password1+ "| " +phone+ " |" +this.formatDate(date)+ " |" + gender+ "| " + idcard.value);
    // console.log( idcard.value);
    const userWithEmail = this.userS.find(user => user.email == email);

    if(phone == "")
      {
        phone = "xxx-xxxxxxx"
      }


    if(name == "" || email == "" || password1  == "" || date  == "" || gender  == undefined )
      {
        this.nodata=true;
      }

    else if(!email.includes("@"))
      {
        this.noemail=true;

      }
    else if(userWithEmail)
      {
        this.noemail=true;

      }


    else if( idcard.value == ""){
      this.noregis=true
      let jin={
        email: email,
        password: password1,
        fullName: name,
        gender: gender,
        brithday: this.formatDate(date),
        phoneNumber: phone
      }

      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/users-noimg",jin,{}))
      this.noregis=false
      this.rou.navigateByUrl('/')

    }
    else{
      this.noregis=true
      let finalvalue
      let  file = idcard.files?.item(0);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      let readAsDataURL = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);

      });
      finalvalue = await readAsDataURL;

      let jin={
        email: email,
        password: password1,
        fullName: name,
        gender: gender,
        brithday: this.formatDate(date),
        phoneNumber: phone,
        id_card: finalvalue

      }

      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/users",jin,{}))
      this.noregis=false
      this.rou.navigateByUrl('/')
    }
  }
  formatDate(dateString: string) {
    const dateComponents = dateString.split('/');
    const rearrangedComponents = [dateComponents[2], dateComponents[0], dateComponents[1]];
    return rearrangedComponents.join('/');
  }
  Chnodata()
  {
    this.nodata=false
  }
  Chnodataemail()
  {
    this.noemail=false
  }
  onlyNumbers(event: KeyboardEvent) {
    const char = String.fromCharCode(event.charCode);
    const charCodeAsNumber = parseInt(char, 10);
    if (!isNaN(charCodeAsNumber)) {
      // Allow numbers
      return;
    } else if (event.charCode === 8 || event.charCode === 13) {
      // Allow backspace and enter keys
      return;
    }
    event.preventDefault(); // Prevent non-numeric characters
  }




}
