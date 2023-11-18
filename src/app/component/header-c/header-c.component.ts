
import { Component } from '@angular/core';

import { DataService } from 'src/app/service/data.service';
import { Convert as productCVT,Product } from 'src/app/model/product.model';

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.scss']
})
export class HeaderCComponent {
  prodS=Array<Product>();
  constructor(private dataser:DataService,private http:HttpClient)
  {
    http.get(dataser.apiPJ+"/product").subscribe((data:any)=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))
      console.log(this.prodS)
    })
  }
  findid(id=0)
  {
    this.http.get(this.dataser.apiPJ+"/product/type/"+id).subscribe(data=>
    {
      this.prodS=productCVT.toProduct(JSON.stringify(data))

    })
  }

}
