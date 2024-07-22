import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  //constructor(private dataser:DataService,private http:HttpClient,private dia:MatDialog,private rou:Router)
  constructor(private rou:Router)
  {

  }
  login()
  {
    this.rou.navigateByUrl('/login')
  }

}
