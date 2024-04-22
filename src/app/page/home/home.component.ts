import { HttpClient } from '@angular/common/http';
import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Convert as competCVT,Compets } from 'src/app/model/compets.model';
import { Convert as userCVT,User } from 'src/app/model/user.model';

import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { lastValueFrom } from 'rxjs';
  /**
   * @title Table with pagination
   */


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent  implements AfterViewInit {
  menu=this.dataS.menu;
  input: any;
  Nev:any;
  @ViewChild('sidenavContent1') sidenavContent1: MatSidenavContent | undefined;
  @ViewChild('sidenavContent2') sidenavContent2: MatSidenavContent | undefined;
  @ViewChild('sidenavContent3') sidenavContent3: MatSidenavContent | undefined;
  @ViewChild('sidenavContent4') sidenavContent4: MatSidenavContent | undefined;
  // @ViewChild(MatSidenavContent, { static: true }) sidenavContent: MatSidenavContent | undefined;
  @ViewChild('sidenav') sidenav:MatSidenav | undefined
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  competS=Array<Compets>()
  competM=Array<Compets>()
  user1=Array<User>()
  userS=Array<User>()

  dataSource:any

  constructor(private  elemant:ElementRef,private render:Renderer2,private dataS:DataService
    ,private route: ActivatedRoute,private cdr: ChangeDetectorRef,private rou:Router
    ,private http:HttpClient) {
      this.menu=this.dataS.menu;
      console.log("menudatas",this.menu)
      this.selectmenu(this.menu,true)
      // if(this.menu==1)
      //   {
      //     console.log(1)
      //     http.get(dataS.apiPJ+"/compets").subscribe((data:any)=>
      //       {
      //         this.competS=competCVT.toCompets(JSON.stringify(data))
      //         console.log(this.competS)
      //       })

      //   }



   }

   displayedColumns: string[] = ['name', 'phone'];





   ngAfterViewInit() {
    // console.log('start:', this.paginator,"me:::",this.menu);
    // if ( this.menu == 4 ) {
    //   console.log('paginator1111:', this.paginator,"me:::",this.menu);
    this.cdr.detectChanges();
    // }

  }

   ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.menu = +params['menu'] || 1;
    // });

  }


   applyFilter(event: Event) {
    //  const filterValue = (event.target as HTMLInputElement).value;
    //  this.dataSource.filter = filterValue.trim().toLowerCase();
     const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

   }
   search()
   {

   }
   async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
    }
  async selectmenu(id:any,nev:boolean)
   {
    this.dataS.menu=id;
    this.menu=this.dataS.menu;
    if(this.menu==1)
      {
        console.log(1)
        this.http.get(this.dataS.apiPJ+"/compets").subscribe((data:any)=>
          {
            this.competS=competCVT.toCompets(JSON.stringify(data))
            console.log(this.competS)
          })

      }
      if(this.menu==2)
        {
          console.log(2)
          this.http.get(this.dataS.apiPJ+"/users/id/2").subscribe((data:any)=>
            {
              this.user1=userCVT.toUser(JSON.stringify(data))
              console.log(this.user1)
            })

        }
        if(this.menu==3)
          {
            console.log(3)
            this.http.get(this.dataS.apiPJ+"/compets/id/1").subscribe((data:any)=>
              {
                this.competM=competCVT.toCompets(JSON.stringify(data))
                console.log(this.competM)
              })

          }
          if(this.menu==4)
            {
              console.log(4)
              let data:any= await lastValueFrom(this.http.get(this.dataS.apiPJ+"/users",
              {

              }))
                this.userS=userCVT.toUser(JSON.stringify(data))
                console.log(this.userS)

                this.dataSource = new MatTableDataSource<User>(this.userS);
                this.dataSource.paginator = this.paginator;

                console.log(this.dataSource);
                console.log('paginator1111:', this.paginator,"me:::",this.menu);

            }






    // if (!nev)
    // {
    //   // console.log("new "+nev)

      //   const $matSidenavContent = this.elemant.nativeElement.querySelector(
      //   'mat-sidenav-content'
      // );


    //   // this.render.setStyle($matSidenavContent, 'margin-left', '55px');
    //   // this.cdr.detectChanges();
    //   // console.log("ทำงาน");


    // }

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
      this.render.removeStyle($matSidenavContent,'margin-left')
      this.sidenav?.toggle();

    }
  }


}
