import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as productCVT,Product } from 'src/app/model/product.model';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DiaComponent } from '../dia/dia.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cus',
  templateUrl: './cus.component.html',
  styleUrls: ['./cus.component.scss']
})
export class CusComponent {
  prodS=Array<Product>();
  Cus:any
  constructor(private dataser:DataService,private http:HttpClient,private dia:MatDialog,private rou:Router)
  {
    http.get(dataser.apiPJ+"/product").subscribe((data:any)=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))
      console.log(this.prodS)
    })
    this.Cus=dataser.cid
  }
  findid(id=0)
  {
    this.http.get(this.dataser.apiPJ+"/product/type/"+id).subscribe(data=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))

    })
  }
  findA()
  {
    this.http.get(this.dataser.apiPJ+"/product").subscribe(data=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))

    })
  }
  buy()
  {
      this.dia.open(DiaComponent,{minWidth:'300px'})
  }
  add(name1:any,id:any,pricc:any)
  {
      // this.dataser.productS.push(name1)
      let puu=true
      let count=1
      let as={
        pid: id,
        name:name1,
        count:count,
        price:pricc

      }

      this.dataser.product12.forEach(element => {
        if(id==element.pid)
        {
          element.count=element.count+1
          console.log(this.dataser.product12)
          puu=false
        }
      });
      if(puu==true)
      {
        this.dataser.product12.push(as)
        console.log(this.dataser.product12)
      }


      // for(let vaa of this.dataser.product12 )
      // {
      //   if(id==vaa.pid)
      //   {
      //     vaa.count=vaa.count+1
      //     console.log(this.dataser.product12)
      //   }
      //   else
      //   {
      //     this.dataser.product12.push(as)
      //     console.log(this.dataser.product12)
      //   }
      // }
      // if(this.dataser.product12.length==0)
      // {

      //   this.dataser.product12.push(as)
      //   console.log(this.dataser.product12)
      // }





  }
  logout()
  {
    this.rou.navigateByUrl('/login')
  }
  odrecus()
  {
    this.rou.navigateByUrl('/ordercus')
  }





}
