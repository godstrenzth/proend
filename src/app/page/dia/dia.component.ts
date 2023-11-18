import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { delay, lastValueFrom } from 'rxjs';
import { Convert as productCVT,Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-dia',
  templateUrl: './dia.component.html',
  styleUrls: ['./dia.component.scss']
})
export class DiaComponent {
  prodS=Array<Product>();
  prodSS=new Array<any>
  pordeer=new Array<any>
  po=new Array<any>

  total=0
  constructor(private data:DataService,private dia:MatDialogRef<DiaComponent>,private http:HttpClient)
  {

    this.pordeer=data.product12
    this.TT()
    // this.pri=data.pric
    // http.get(data.apiPJ+"/product").subscribe((data:any)=>
    // {
    //   this.prodS=productCVT.toProduct(JSON.stringify(data))
    //   console.log(this.prodS)
    //   this.prr()
    //   this.TT()
    // })


  }

  del(element:number)
  {
    delete this.pordeer[element];


    // console.log(element)
    console.log(this.pordeer)

    this.TT()
  }
  clo()
  {

    this.dia.close()
  }
  order(name:any,ph:any,add:any)
  {

    // let orderQ={
    //   cid: this.data.cid,
    //   name:name,
    //   phone:ph,
    //   address:add,
    // }
    // let jsonT =JSON.stringify(orderQ)

    // this.http.post(this.data.apiPJ+"/iorder/payment",jsonT).subscribe((response)=>
    // {
    //   // console.log(JSON.stringify(response.status))

    // })


    // let op=
    // {
    //   pid:this.pordeer

    // }
    let jsonPP =JSON.stringify(this.pordeer)


    // let data:any= await lastValueFrom(this.http.post(this.data.apiPJ+"/order/buy",jsonPP,
    // {

    // }))
    ////////////////////////////////////////////////////////////////////////////
    // this.http.post(this.data.apiPJ+"/order/buy",jsonPP).subscribe((response)=>
    // {
    //   // console.log(JSON.stringify(response.status))


    // })
    ////////////////////////////////////////////////////////////////////////////
    // delay(2000)
    // let orderQ={
    //   cid: this.data.cid,
    //   name:name,
    //   phone:ph,
    //   address:add,
    // }
    // let jsonT =JSON.stringify(orderQ)

    ////////////////////////////////////////////////////////////////////////////
    this.http.post(this.data.apiPJ+"/iorder/payment/"+this.data.cid+"/"+name+"/"+ph+"/"+add,jsonPP).subscribe((response)=>
    {
      //  console.log(JSON.stringify(response))

    })

    let ty=new Array<any>
    this.data.product12= ty
    console.log(this.data.product12)
    this.dia.close()


  }
  // setc(index:any,ca:any)
  // {
  //   // this.po[index]=this.pordeer[index].count

  //   this.pordeer[index].count=ca
  //   console.log(this.pordeer[index])
  //   if(this.pordeer[index].count <=0)
  //   {
  //     delete this.pordeer[index];
  //     delete this.pri[index];
  //   }
  // }
  setc(index:any,ca:any,pid:any)
  {
    // this.po[index]=this.pordeer[index].count

    this.pordeer[index].count=ca
    console.log(this.pordeer[index])
    // this.prodS.forEach(element => {
    //   if(pid==element.pid)
    //   {
    //     this.pri[index]=element.price*ca
    //   }

    // });

    if(this.pordeer[index].count <=0)
    {
      delete this.pordeer[index];
      // delete this.pri[index];
    }
    this.TT()
  }
  // prt(pid:any,iaa:any,cont:any)
  // {


  //   this.prodS.forEach(element => {
  //     if(pid==element.pid)
  //     {
  //       this.pri[iaa]=element.price*cont
  //     }

  //   });
  //   console.log(pid,iaa,cont)

  // }
  // prr()
  // {

  //   this.pordeer.forEach(element => {

  //     this.prodS.forEach(e1 => {
  //       if(element.pid==e1.pid)
  //       {
  //         this.pri.push(e1.price*element.count)
  //         // this.total=this.total+(e1.price*element.count)
  //       }

  //     });


  //   });
  //   console.log(this.pri)

  // }
  TT()
  {
    this.total=0
    this.pordeer.forEach(element => {
      this.total=this.total+(element.price*element.count)

    });
  }

}
