import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiPJ="http://localhost/projectwebapi"
  menu:any

  constructor() {
    this.menu = this.menu || 1;
  }
}
