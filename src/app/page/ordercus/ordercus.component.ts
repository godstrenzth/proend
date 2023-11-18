import { Component } from '@angular/core';
import { Convert as productCVT,Product } from 'src/app/model/product.model';
import { Convert as shopCVT,Shop } from 'src/app/model/shop.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DiaComponent } from '../dia/dia.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Convert as OrderCVT,Ordercus } from 'src/app/model/ordercus.model';
import { MatListOption } from '@angular/material/list';
@Component({
  selector: 'app-ordercus',
  templateUrl: './ordercus.component.html',
  styleUrls: ['./ordercus.component.scss']
})
export class OrdercusComponent {
  prodS=Array<Product>();
  Cus:any
  selDE:any
  ordereS=Array<Ordercus>()
  shopS=Array<Shop>()
  payr="ยังไม่จ่าย"

  constructor(private data1:DataService,private http:HttpClient,private dia:MatDialog,private rou:Router)
  {
    http.get(data1.apiPJ+"/iorder/status/"+data1.cid).subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      console.log(this.shopS)
    })
    this.Cus=data1.cid
  }
  findid(id=0)
  {
    this.http.get(this.data1.apiPJ+"/product/type/"+id).subscribe(data=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))

    })
    this.rou.navigateByUrl('/cus')
  }
  findA()
  {
    this.http.get(this.data1.apiPJ+"/product").subscribe(data=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))

    })
  }
  buy()
  {
      this.dia.open(DiaComponent,{minWidth:'300px'})
  }
  logout()
  {
    this.rou.navigateByUrl('/login')
  }
  odrecus()
  {
    // this.rou.navigateByUrl('/ordercus')
    this.http.get(this.data1.apiPJ+"/iorder/status/"+this.data1.cid).subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      console.log(this.shopS)
    })
    this.selDE=undefined
  }
  home()
  {
    this.rou.navigateByUrl('/cus')
  }
  detail(option:MatListOption)
  {
    this.selDE=option.value;
    console.log(this.selDE)
    this.http.get(this.data1.apiPJ+"/iorder/statusByIoid/"+this.selDE['ioid']).subscribe((data:any)=>
    {
      this.ordereS=OrderCVT.toOrdercus(JSON.stringify(data))
      console.log(this.ordereS)

      // this.total= this.ordereS[this.ordereS.length-1]
      // console.log(this.total)
    })
  }
  uppay(id:any,st:any)
  {
    console.log(id)
    if(st=="ยังไม่จ่าย")
    {
      this.http.get(this.data1.apiPJ+"/iorder/pay/"+id).subscribe((data:any)=>
      {

        // this.total= this.ordereS[this.ordereS.length-1]
        // console.log(this.total)
      })

      // window.location.reload()
      this.http.get(this.data1.apiPJ+"/iorder/status/"+this.data1.cid).subscribe((data:any)=>
      {
        this.shopS=shopCVT.toShop(JSON.stringify(data))
        console.log(this.shopS)
      })
      this.selDE=undefined
      alert("Purchase successfully");
    }
    else{
      alert("Purchase fail");
    }

  }



}
