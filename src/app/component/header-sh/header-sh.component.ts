import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header-sh',
  templateUrl: './header-sh.component.html',
  styleUrls: ['./header-sh.component.scss']
})

export class HeaderSHComponent {

  constructor(private rou:Router)
  {

  }
  logout()
  {
    this.rou.navigateByUrl('/login')
  }

}
