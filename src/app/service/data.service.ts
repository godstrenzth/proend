import { Injectable } from '@angular/core';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiPJ="http://localhost/project-food"
  productS=new Array<any>
  product12=new Array<any>

  co:any

  cid:any
  // order={
  //   id:any,
  //   name:any,
  //   count:any


  // }
  // oida:oid[]=[]

  constructor() { }
}
// export interface oid{
//   id:any
//   name:any
//   count:any

// }
