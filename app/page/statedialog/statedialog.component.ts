import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-statedialog',
  templateUrl: './statedialog.component.html',
  styleUrls: ['./statedialog.component.scss']
})
export class StatedialogComponent {
  stloc:any
  nowst:any
  constructor(private rou:Router,private dataS:DataService,private dia:MatDialogRef<StatedialogComponent>)
  {
    this.stloc=localStorage.getItem("status");
    console.log("sa")
    if(this.stloc==1)
      {
        this.nowst="Host"
      }
    else if(this.stloc==2)
      {
        this.nowst="Referee"
      }
    else if(this.stloc==3)
      {
        this.nowst="Athlete"
      }
  }

save(id :any) {
  if(id)
    {
      localStorage.setItem('status',id)
      this.dia.close()
    }
  else
  {
    this.dia.close()
  }

  // console.log("loca= "+localStorage.getItem('status'))
}

}
