import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-createdialog',
  templateUrl: './createdialog.component.html',
  styleUrls: ['./createdialog.component.scss']
})
export class CreatedialogComponent {
  nodata:any
  today = new Date();
  daynow: any;
  datePipe: any;
  noregis:any
  constructor(private rou:Router,private dataS:DataService,private http:HttpClient,private dia:MatDialogRef<CreatedialogComponent>)
  {
    this.datePipe = new DatePipe('en-US');
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  }

  async create(name:any,place:any,img:any,detail:any,cont:any,date:any)
  {

    console.log(name+"||"+place+"||"+img.value+"||"+detail+"||"+cont+"||"+date+"+=="+this.today)    // if(name == "" || email == "" || password  == "" ||phone  == "" || date  == "" || gender  == undefined || idcard =="" )
    //if(name == "" || place == "" || img.value == ""   ||detail  == "" || date  == "" || cont  == "" )
    console.log(this.formatDate(date))
    if(detail  == "")
      {

        detail = "coming soon!!"

      }
    if(cont == "")
      {

        cont = "coming soon!!"

      }


    if(name == "" || place == "" || date  == "" )
      {
        this.nodata=true;
      }
    else if( img.value == "" )
      {
        this.noregis=true
        let jin={
          uid:localStorage.getItem('uid'),
          competName:name,
          regis_end:this.formatDate(date),
          compet_date:this.today,
          detail:detail,
          contact:cont,
          place:place,

        }
        console.log(jin)
        let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/compets-noimg",jin,{}))
        this.noregis=false
        window.location.reload();
        this.dia.close()
      }
    else{
      this.noregis=true
      let finalvalue
      let  file = img.files?.item(0);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      let readAsDataURL = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);

      });
      finalvalue = await readAsDataURL;
      let jin={
        uid:localStorage.getItem('uid'),
        competName:name,
        regis_end:this.formatDate(date),
        compet_date:this.today,
        detail:detail,
        contact:cont,
        place:place,
        poster:finalvalue

      }
      console.log(jin)
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/compets",jin,{}))
      this.noregis=false
      window.location.reload();
      this.dia.close()

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


}
