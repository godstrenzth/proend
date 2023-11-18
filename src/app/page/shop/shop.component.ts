import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Convert as shopCVT,Shop } from 'src/app/model/shop.model';
import { HttpClient } from '@angular/common/http';
import { MatListOption } from '@angular/material/list';
import { Convert as OrderCVT,Ordercus } from 'src/app/model/ordercus.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  shopS=Array<Shop>()
  ordereS=Array<Ordercus>()
  selDE:any

  constructor(private data:DataService,private http:HttpClient,private rou:Router)
  {
    http.get(data.apiPJ+"/iorder/status").subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      console.log(this.shopS)
    })

  }
  detail(option:MatListOption)
  {
    this.selDE=option.value;
    console.log(this.selDE)
    this.http.get(this.data.apiPJ+"/iorder/statusByIoid/"+this.selDE['ioid']).subscribe((data:any)=>
    {
      this.ordereS=OrderCVT.toOrdercus(JSON.stringify(data))
      console.log(this.ordereS)

      // this.total= this.ordereS[this.ordereS.length-1]
      // console.log(this.total)
    })
  }
  upstate(ioid:any)
  {

    console.log(ioid)
    this.http.get(this.data.apiPJ+"/iorder/cstatus/"+ioid).subscribe((data:any)=>
    {
      this.ordereS=OrderCVT.toOrdercus(JSON.stringify(data))
      // console.log(this.ordereS)

      // this.total= this.ordereS[this.ordereS.length-1]
      // console.log(this.total)
    })
    this.http.get(this.data.apiPJ+"/iorder/status").subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      // console.log(this.shopS)
    })
    this.selDE=undefined
      alert("already shipped");
    // window.location.reload()
  }
  unstate(ioid:any)
  {

    console.log(ioid)
    this.http.get(this.data.apiPJ+"/iorder/ncstatus/"+ioid).subscribe((data:any)=>
    {
      this.ordereS=OrderCVT.toOrdercus(JSON.stringify(data))
      // console.log(this.ordereS)

      // this.total= this.ordereS[this.ordereS.length-1]
      // console.log(this.total)
    })
    this.http.get(this.data.apiPJ+"/iorder/status").subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      // console.log(this.shopS)
    })
    this.selDE=undefined
      alert("Waiting for delivery");
    // window.location.reload()
  }
  logout()
  {
    this.rou.navigateByUrl('/loginshop')
  }
  home()
  {
    this.http.get(this.data.apiPJ+"/iorder/status").subscribe((data:any)=>
    {
      this.shopS=shopCVT.toShop(JSON.stringify(data))
      this.selDE=undefined
      // console.log(this.shopS)
    })
  }


}
