import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent  {
  menu=1;
  input: any;
  @ViewChild('sidenav') sidenav:MatSidenav | undefined

  constructor(private readonly elemant:ElementRef,private render:Renderer2) {

   }
   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   dataSource = new MatTableDataSource(ELEMENT_DATA);

   applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }
   search()
   {

   }
   selectmenu(id:any)
   {
    this.menu=id;
    console.log(this.menu)
   }
   animateSidenav() {
    const isSideNavOpened = this.sidenav?.opened;
    const $matSidenav = this.elemant.nativeElement.querySelector(
      'mat-sidenav'
    );
    const $matSidenavContent = this.elemant.nativeElement.querySelector(
      'mat-sidenav-content'
    );

    if (isSideNavOpened) {
      this.sidenav?.toggle();
      window.setTimeout(() => {
        this.render.setStyle($matSidenav, 'width', '0px');
        this.render.setStyle(
          $matSidenav,
          'transform',
          'translate3d(0, 0, 0)'
        );
        window.setTimeout(() => {
          this.render.setStyle($matSidenav, 'width', '55px');
          this.render.setStyle($matSidenav, 'transition', 'width 0.3s');
          this.render.setStyle($matSidenav, 'visibility', 'visible');
          this.render.setStyle($matSidenavContent, 'margin-left', '55px');
        }, 100);
      }, 400);
    } else {
      this.render.removeStyle($matSidenav, 'width');
      this.render.removeStyle($matSidenav, 'transition');
      this.render.removeStyle($matSidenav, 'visibility');
      this.render.removeStyle($matSidenav, 'transform');
      this.render.removeStyle($matSidenavContent, 'margin-left');
      this.sidenav?.toggle();
    }
  }


}
