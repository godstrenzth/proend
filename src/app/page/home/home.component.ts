import { HttpClient } from '@angular/common/http';
import {  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Convert as competCVT,Compets } from 'src/app/model/compets.model';
import { Convert as userCVT,User } from 'src/app/model/user.model';

import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StatedialogComponent } from '../statedialog/statedialog.component';
import { DetaildialogComponent } from '../detaildialog/detaildialog.component';
import { DatePipe } from '@angular/common';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { DetildialogoneComponent } from '../detildialogone/detildialogone.component';
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
  @ViewChild(MatPaginator) paginate!: MatPaginator;

  competS=Array<Compets>()
  competM=Array<Compets>()
  combystatus:any
  user1=Array<User>()
  userS=Array<User>()
  tempcom1:any
  filteredCompetS:any
  img64:any
  P_telphone:any
  userWithEmail:any


  uidlocal:any
  statuslocal:any
  dataSource:any
  daynow : any
  datePipe :any

  endindex:any=undefined
  pageSize = 6; // Items per page
  pageIndex = 0; // Current page index
  colorMain="#86469C"
  colorBC="#BC7FCD"
  colorsub1="#FB9AD1"
  colorsub2="#FFCDEA"

  error:any
  success:any
  noregis:any
  nodata:any
  prifull:any
  noemail:any

  constructor(private  elemant:ElementRef,private render:Renderer2,private dataS:DataService
    ,private route: ActivatedRoute,private cdr: ChangeDetectorRef,private rou:Router
    ,private http:HttpClient,private dia:MatDialog) {

      this.route.params.subscribe(params => {
        if(params['sel'] != undefined)
          {
            this.dataS.menu=params['sel'];
          }
      });
      this.menu=this.dataS.menu;
      console.log("menudatas",this.menu)
      this.selectmenu(this.menu,true)

      this.statuslocal= localStorage.getItem('status')
      this.uidlocal= localStorage.getItem('uid')


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

   displayedColumns: string[] = ['ID','Name', 'Phone','Detail'];

   saveprofile(name:any,email:any,tel:any,img:any)
   {
     this.http.get(this.dataS.apiPJ+"/users").subscribe((data:any)=>
      {
        this.userS=userCVT.toUser(JSON.stringify(data))
        this.userWithEmail = this.userS.find(user => user.email == email);
        console.log(this.userWithEmail)

        console.log(name,email,tel)
        if(name=="" || email =="" || tel =="")
        {
          this.nodata=true
        }
        else if(name == this.user1[0].fullName && email == this.user1[0].email && tel == this.user1[0].phoneNumber &&img=="")
        {
          this.prifull=true
        }
        else if(email !=this.user1[0].email)
        {
          if(this.userWithEmail)
          {
            this.noemail=true
          }
          else{

            if(this.img64 == undefined)
            {
              console.log("Enull")
              let userup={
                fullName: name,
                email: email,
                phoneNumber: tel,
              }
              console.log(userup)

              this.http.post(this.dataS.apiPJ+"/update-user-noimg/"+this.uidlocal, userup)
              .subscribe({
                next: (response) => {
                  //console.log(response)
                  this.http.get(this.dataS.apiPJ+"/users/id/"+this.uidlocal).subscribe((data:any)=>
                    {
                      this.user1=userCVT.toUser(JSON.stringify(data))
                    })
                  this.success = true; // set success to true
                  setTimeout(() => {
                    this.success = false; // set success back to false after 10 seconds
                  }, 5000); // 1000 milliseconds = 1 seconds
                },
                error: (error) => {

                  error=true;
                  console.error("Error saving data:", error.status);
                },
              });
            }
            else{
              console.log("Enot null")
              let userup={
                fullName: name,
                email: email,
                phoneNumber: tel,
                id_card:this.img64
              }
              console.log(userup)

              this.http.post(this.dataS.apiPJ+"/update-user/"+this.uidlocal, userup)
              .subscribe({
                next: (response) => {
                  //console.log(response)
                  this.http.get(this.dataS.apiPJ+"/users/id/"+this.uidlocal).subscribe((data:any)=>
                    {
                      this.user1=userCVT.toUser(JSON.stringify(data))
                    })
                  this.success = true; // set success to true
                  setTimeout(() => {
                    this.success = false; // set success back to false after 10 seconds
                  }, 5000); // 1000 milliseconds = 1 seconds
                },
                error: (error) => {
                  error=true;
                  console.error("Error saving data:", error.status);
                },
              });
            }
          }
        }
        else{
          if(this.img64 == undefined)
            {
              console.log("null")
              let userup={
                fullName: name,
                email: email,
                phoneNumber: tel,
              }
              console.log(userup)

              this.http.post(this.dataS.apiPJ+"/update-user-noimg/"+this.uidlocal, userup)
              .subscribe({
                next: (response) => {
                  //console.log(response)
                  this.http.get(this.dataS.apiPJ+"/users/id/"+this.uidlocal).subscribe((data:any)=>
                    {
                      this.user1=userCVT.toUser(JSON.stringify(data))
                    })
                  this.success = true; // set success to true
                  setTimeout(() => {
                    this.success = false; // set success back to false after 10 seconds
                  }, 5000); // 1000 milliseconds = 1 seconds
                },
                error: (error) => {

                  error=true;
                  console.error("Error saving data:", error.status);
                },
              });
            }
            else{
              console.log("not null")
              let userup={
                fullName: name,
                email: email,
                phoneNumber: tel,
                id_card:this.img64
              }
              console.log(userup)

              this.http.post(this.dataS.apiPJ+"/update-user/"+this.uidlocal, userup)
              .subscribe({
                next: (response) => {
                  //console.log(response)
                  this.http.get(this.dataS.apiPJ+"/users/id/"+this.uidlocal).subscribe((data:any)=>
                    {
                      this.user1=userCVT.toUser(JSON.stringify(data))
                    })
                  this.success = true; // set success to true
                  setTimeout(() => {
                    this.success = false; // set success back to false after 10 seconds
                  }, 5000); // 1000 milliseconds = 1 seconds
                },
                error: (error) => {

                  error=true;
                  console.error("Error saving data:", error.status);
                },
              });

            }

        }


  })
  }

  updatePosterValue(imgInput: HTMLInputElement) {
    const file = imgInput.files?.[0];
    // console.log(file?.name)
    this.user1[0].id_card=file?.name || "";
    if (file) {
        // ใช้ FileReader ในการอ่านข้อมูลจากไฟล์ภาพ
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // เมื่ออ่านเสร็จสิ้น ให้ตั้งค่าค่าใน input text เป็นค่า base64 ของไฟล์ภาพ
            this.img64 = reader.result as string;
        };
    }
  }



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

    console.log("ngonit"+localStorage.getItem('status'))
    this.datePipe = new DatePipe('en-US');
    this.daynow = this.datePipe.transform(new Date(), 'yyyy-MM-dd');


  }

   opnediaStatus()
  {

    this.rou.navigateByUrl('/home')
    this.dataS.menu=1;
    this.menu=this.dataS.menu;
    // this.dia.open(StatedialogComponent)

    const dialogRef: MatDialogRef<StatedialogComponent> = this.dia.open(StatedialogComponent);

    // Subscribe to the afterClosed() observable to handle dialog closure
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { // Check if dialog closed with a value (result)
        console.log("Dialog closed with status:", result); // Log the result
      } else {
       this.statuslocal=localStorage.getItem('status');
      }
    });


  }
  opnediauserDetail(id : any)
  {

    this.dia.open(DetaildialogComponent, {
      data: {uid: id},
    });
  }
  opnediauserDetailview(id : any)
  {

    this.dia.open(DetildialogoneComponent, {
      data: {uid: id},
    });
  }
  opneCDetail()
  {

    this.dia.open(CreatedialogComponent,{width:"600px"});
  }
  handlePageChange(event: PageEvent) {

    // this.pageIndex = event.pageIndex;
    const startindex=event.pageIndex * event.pageSize;
    let endindex =startindex + event.pageSize;
    this.endindex=endindex;
    if(endindex > this.competS.length )
      {
        endindex=this.competS.length
      }
      this.filteredCompetS=this.competS.slice(startindex,endindex)
      console.log(startindex,endindex)
  }
  applyFiltercom(comaa:any) {
    console.log(comaa)

    if(comaa == "")
      {
        this.competS=this.tempcom1

        if(this.endindex!=undefined)
          {
            this.filteredCompetS = this.tempcom1.slice(0,this.endindex);
          }
        else{
          this.filteredCompetS = this.tempcom1.slice(0,6);

        }
      }
    else{
      this.filteredCompetS = this.competS.filter(compet => {
        const searchTerm = comaa.toLowerCase(); // Convert search term to lowercase for case-insensitive search
        return (
          compet.competName.toLowerCase().includes(searchTerm) || // Search by competition name
          compet.place.toLowerCase().includes(searchTerm)||
          compet.regis_end.toLowerCase().includes(searchTerm)
          // ||
          // compet.contact.toLowerCase().includes(searchTerm) // Search by place (optional, add more search criteria as needed)
        );
      });

      this.competS=this.filteredCompetS
      //this.filteredCompetS= this.filteredCompetS.slice(0,6);
      if(this.endindex!=undefined)
        {
          this.filteredCompetS= this.filteredCompetS.slice(0,this.endindex);

        }
      else
        {
          this.filteredCompetS= this.filteredCompetS.slice(0,6);


        }

    }


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
    console.log("selme ="+localStorage.getItem('status'))
    this.dataS.menu=id;
    this.menu=this.dataS.menu;
    if(this.menu==1)
      {
        console.log(1)
        this.http.get(this.dataS.apiPJ+"/compets").subscribe((data:any)=>
          {

            this.competS=competCVT.toCompets(JSON.stringify(data))


            this.competS.sort((a, b) => b.regis_end.localeCompare(a.regis_end));
            this.tempcom1=this.competS
            this.filteredCompetS = this.competS.slice(0,6);
            this.pageIndex=0
            console.log(this.competS)




          })

      }
      if(this.menu==2)
        {
          console.log(2)

          this.uidlocal=localStorage.getItem("uid")
          if(this.user1.length <= 0)
            {
              this.http.get(this.dataS.apiPJ+"/users/id/"+this.uidlocal).subscribe((data:any)=>
                {
                  this.user1=userCVT.toUser(JSON.stringify(data))
                  this.P_telphone=this.user1[0].phoneNumber
                  console.log(this.user1)
                })
            }



        }
        if(this.menu==3)
          {
            console.log(this.competS)
            if(this.competS.length <= 0 )
              {
                await this.http.get(this.dataS.apiPJ+"/compets").subscribe((data:any)=>
                  {
                    this.competS=competCVT.toCompets(JSON.stringify(data))
                    console.log(this.competS)
                  })

              }
            let uid=localStorage.getItem('uid')
            console.log(uid)
            if(this.statuslocal == 1)
            {
              await this.http.get(this.dataS.apiPJ+"/search/comp/"+uid).subscribe((data:any)=>
              {

                JSON.stringify(data)
                console.log(data)
                this.combystatus=data
                this.competM = this.competS.filter(com => {
                  return this.combystatus.some((status: { cid: number; }) => status.cid == com.cid);
                });
                // this.competM=competCVT.toCompets(JSON.stringify(data))
                // console.log(this.competM)
              })



            }
            else if(this.statuslocal == 2)
              {
                this.http.get(this.dataS.apiPJ+"/search/referee/"+uid).subscribe((data:any)=>
                  {

                    JSON.stringify(data)
                    console.log(data)
                    this.combystatus=data
                    this.competM = this.competS.filter(com => {
                      return this.combystatus.some((status: { cid: number; }) => status.cid == com.cid);
                    });

                  })

              }
            else if(this.statuslocal == 3)
              {
                this.http.get(this.dataS.apiPJ+"/search/apply/"+uid).subscribe((data:any)=>
                  {

                    JSON.stringify(data)
                    console.log(data)
                    this.combystatus=data
                    this.competM = this.competS.filter(com => {
                      return this.combystatus.some((status: { cid: number; }) => status.cid == com.cid);
                    });
                  })
                  console.log("-----------")
                  console.log(this.competM)
                  console.log("-----------")

              }




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
  calculateAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const millisecondsDiff = today.getTime() - birthDateObj.getTime();
    const ageInYears = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24 * 365));
    return ageInYears;
  }
  onlyNumbers(event: KeyboardEvent) {
    const char = String.fromCharCode(event.charCode);
    const charCodeAsNumber = parseInt(char, 10);
    if (!isNaN(charCodeAsNumber)) {
      // Allow numbers
      return;
    } else if (event.charCode === 8 || event.charCode === 13) {
      // Allow backspace and enter keys
      return;
    }
    event.preventDefault(); // Prevent non-numeric characters
  }




  errorCh()
  {
    this.error = false; // set error to true
  }

  successCh()
  {
    this.success = false;
  }
  Chnodata()
  {
    this.nodata = false;
  }
  primaryCh()
  {
    this.prifull=false;
  }
  Chnoemail()
  {
    this.noemail=false;
  }

}
