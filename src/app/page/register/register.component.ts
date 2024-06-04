import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

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

  constructor(private rou:Router,private dataS:DataService,private http:HttpClient)
  {
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

    if(name == "" || email == "" || password1  == "" ||phone  == "" || date  == "" || gender  == undefined || idcard.value == "")
      {
        this.nodata=true;
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
