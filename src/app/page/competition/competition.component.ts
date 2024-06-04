
import { AdnTournament } from '@adonsio/adn-tournament/lib/declarations/interfaces';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { StatedialogComponent } from '../statedialog/statedialog.component';
import { HttpClient } from '@angular/common/http';
import { Convert as competCVT,Compets } from 'src/app/model/compets.model';
import { Convert as typeCVT,Type } from 'src/app/model/type.model';
import { Convert as refereeCVT,Referee } from 'src/app/model/referee.model';
import { Convert as applyCVT,Apply } from 'src/app/model/apply.model';
import { Convert as applyuserCVT,Applyuser } from 'src/app/model/applyuser.model';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface TT {
  T: string;
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
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent {
  menu=1;
  input: any;
  @ViewChild('sidenav') sidenav:MatSidenav | undefined
  myTournamentData: AdnTournament = {
    rounds: [
      {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
                { name: 'sad', score: 1 },
                { name: 'Team  B', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  C', score: 1 },
                { name: 'Team  D', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  E', score: 1 },
                { name: 'Team  F', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  G', score: 1 },
                { name: 'Team  H', score: 2 }]
          }, {
            teams: [
                { name: 'Team  A', score: 1 },
                { name: 'Team  B', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  C', score: 1 },
                { name: 'Team  D', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  E', score: 1 },
                { name: 'Team  F', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  G', score: 1 },
                { name: 'Team  H', score: 2 }]
          }
        ]
      }, {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
                { name: 'Team  A', score: 1 },
                { name: 'Team  B', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  C', score: 1 },
                { name: 'Team  D', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  E', score: 1 },
                { name: 'Team  F', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  G', score: 1 },
                { name: 'Team  H', score: 2 }]
          }
        ]
      },
      {
        type: 'Winnerbracket',
        matches: [
          {
            teams: [
                { name: 'Team  B', score: 1 },
                { name: 'Team  D', score: 2 }]
          },
          {
            teams: [
                { name: 'Team  F', score: 1 },
                { name: 'Team  H', score: 2 }]
          }
        ]
      },
      {
        type: 'Final',
        matches: [
          {
            teams: [
              {
                name: 'Team  D',
                score: 1
              },
              {
                name: 'Team  H',
                score: 2
              }
            ]
          },
        ]
      }
    ]
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['position', 'name'];
  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol', 'edit',];
  displayedColumns3: string[] = ['position', 'name', 'close'];
  dataSource = ELEMENT_DATA;
  dataSource2 :any
  statuslocal:any
  competM=Array<Compets>()
  TypeCid=Array<Type>()
  refA=Array<Referee>()
  applybyuid=Array<Apply>()
  Type: TT[]
  TypeVaild : TT[] | undefined
  Typeforuid=Array<Type>()
  applyuserAll=Array<Applyuser>()

  uidlocal:any
  cid:any
  error:any
  success:any
  noregis:any
  nodata:any
  img64:any
  creother=false
  allow:any
  prifull:any

  amount=1
  inputValue: number | undefined;
  amountO=1
  inputValueO: number | undefined;
  minAllowedValue: number = 1;
  maxAllowedValue: number = 10;
  selAthleteselTy:any| undefined;
  tableapplyuser:any

  constructor(private readonly elemant:ElementRef,private render:Renderer2,private route: ActivatedRoute,
    private rou:Router,private dataS:DataService,private dia:MatDialog,private http:HttpClient
    ) {
      this.route.params.subscribe(params => {
        this.cid = params['cid'];
       // Output the value of cid
      });
    this.uidlocal= localStorage.getItem('uid')
    this.statuslocal= localStorage.getItem('status')
    console.log(this.statuslocal)
    this.Type=dataS.dataT1
    this.http.get(this.dataS.apiPJ+"/compets/id/"+this.cid).subscribe((data:any)=>
      {
        this.competM=competCVT.toCompets(JSON.stringify(data))
        console.log(this.competM)
      })
    this.http.get(this.dataS.apiPJ+"/tkd/"+this.cid).subscribe((data:any)=>
      {
        this.TypeCid=typeCVT.toType(JSON.stringify(data))
        console.log(this.TypeCid)

        this.selAthleteselTy=String(this.TypeCid[0].typeID)

        this.TypeVaild = this.Type.filter(T => {
          const typeCidModels = new Set(this.TypeCid.map(status => status.model));
          return !typeCidModels.has(T.T);
        });
        console.log(this.TypeVaild)
      })
      this.http.get(this.dataS.apiPJ+"/regis/"+this.uidlocal).subscribe((data:any)=>
        {
          this.applybyuid=applyCVT.toApply(JSON.stringify(data))
          console.log(this.applybyuid)

          this.Typeforuid = this.TypeCid.filter(T => {
            const typeCidModels2 = new Set(this.applybyuid.map(status => status.tid));
            return !typeCidModels2.has(T.typeID);
          });
          console.log(this.Typeforuid)
        })
          let Type1={
            tid :this.selAthleteselTy,
            }
            console.log(Type1)

            this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
            .subscribe({
              next: (response) => {
                this.applyuserAll=applyuserCVT.toApplyuser(JSON.stringify(response))
                console.log(response)
              },
              error: (error) => {

                this.error=true;
                console.error("Error saving data:", error.status);
              },
            });
      this.http.get(this.dataS.apiPJ+"/referee/"+this.cid).subscribe((data:any)=>
        {
          this.refA=refereeCVT.toReferee(JSON.stringify(data));
          console.log(this.refA)
          this.dataSource2 = new MatTableDataSource<Referee>(this.refA);


        })
        let jin={
          cid :this.cid,
          }
          console.log(jin)

          this.http.post(this.dataS.apiPJ+"/search-comp-uid/"+this.uidlocal, jin)
          .subscribe({
            next: (response) => {
              if(response == "")
                {
                  this.http.post(this.dataS.apiPJ+"/refe/id/"+this.uidlocal, jin)
                  .subscribe({
                    next: (response) => {
                      if(response == "")
                        {
                            this.allow=true
                        }

                    },
                    error: (error) => {
                      console.error("Error saving data:2", error.status);
                    },
                  });
                }

            },
            error: (error) => {
              console.error("Error saving data:1", error.status);
            },
          });



   }
   editRow(a:any)
   {
    console.log(a)
    this.http.delete(this.dataS.apiPJ+"/referee/delete/"+a.rid).subscribe((data:any)=>
      {
        this.http.get(this.dataS.apiPJ+"/referee/"+this.cid).subscribe((data:any)=>
          {
            this.refA=refereeCVT.toReferee(JSON.stringify(data));
            console.log(this.refA)
            this.dataSource2 = new MatTableDataSource<Referee>(this.refA);
          })
        this.success = true; // set success to true
        setTimeout(() => {
          this.success = false; // set success back to false after 10 seconds
        }, 5000);

      })


   }
   search()
   {

   }
   opneCDetail()
   {

     this.dia.open(CreatedialogComponent,{width:"600px"});
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
  updatePosterValue(imgInput: HTMLInputElement) {
    const file = imgInput.files?.[0];
    // console.log(file?.name)
    this.competM[0].poster=file?.name || "";
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


  selectmenu(id:any)
  {
   this.dataS.menu=id;
   this.rou.navigateByUrl('/home')
  }
  other()
  {
    this.creother=true
  }
  async save(name:any,detail:any,place:any,img:any,contact:any,date:any)
  {
    console.log(name+"|"+detail+"|"+place+"|"+this.competM[0].poster+"|"+contact+"|"+date)
    if(name == "" || place == ""    ||detail  == "" || date  == "" || contact  == "" )
      {
        this.nodata=true;
        console.log("1"+name+"|"+detail+"|"+place+"|"+img.value+"|"+contact+"|"+date)
      }
    else if(name == this.competM[0].competName && place == this.competM[0].place&&detail  == this.competM[0].detail && date  == this.competM[0].regis_end && contact  == this.competM[0].contact )
      {
        this.nodata=true;
        console.log("2"+name+"|"+detail+"|"+place+"|"+img.value+"|"+contact+"|"+date)

      }
    else{
      // console.log(name+"|"+detail+"|"+place+"|"+img.value+"|"+contact+"|"+date)
      // console.log(img.value)
      // console.log(this.img64)
      if(this.img64 == undefined)
      {
        console.log("null")
        this.noregis=true
        let jin={
        competName:name,
        regis_end:date,
        detail:detail,
        contact:contact,
        place:place,


        }
        let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/update-compets-nof/"+this.cid,jin,{}))
        this.noregis=false
        this.success = true; // set success to true
        setTimeout(() => {
          this.success = false; // set success back to false after 10 seconds
        }, 5000); // 1000 milliseconds = 1 seconds


        }
      else{
        console.log("not null")
      this.noregis=true
      let jin={
      competName:name,
      regis_end:date,
      detail:detail,
      contact:contact,
      place:place,
      poster:this.img64

      }
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/update-compets/"+this.cid,jin,{}))
      this.noregis=false
      this.success = true; // set success to true
      setTimeout(() => {
        this.success = false; // set success back to false after 10 seconds
      }, 5000); // 1000 milliseconds = 1 seconds

      }



    }



  }
  async Cmodel1(model:any)
  {
    if(model == undefined)
      {
        this.nodata=true;
      }
    else{

      let jin={
      cid :this.cid,
      model:model
      }
      console.log(jin)
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/tkd",jin,{}))
      this.success = true; // set success to true
      setTimeout(() => {
        this.success = false; // set success back to false after 10 seconds
      }, 5000); // 1000 milliseconds = 1 seconds
    }

  }
  async Cmodel2o(model:any,name:any)
  {
    console.log(model+"||"+name)
    let Cmodel=model+" : "+name;
    let hasMatch =false

    hasMatch = this.TypeCid.some(type => type.model === Cmodel);



    if(model == undefined || name == "")
      {
        this.nodata=true;
      }
    else if(hasMatch){
      this.nodata=true;
    }
    else{

      let jin={
        cid :this.cid,
        model:Cmodel
        }
        console.log(jin)
        let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/tkd",jin,{}))
        this.success = true; // set success to true
        setTimeout(() => {
          this.success = false; // set success back to false after 10 seconds
        }, 5000); // 1000 milliseconds = 1 seconds

    }
  }
  async regisA(tyid:any)
  {

   let total:any

    this.http.get(this.dataS.apiPJ+"/regis/check/"+tyid).subscribe((data:any)=>
      {
        total=data
        if(tyid == undefined)
        {
          this.nodata=true
        }

        else if(total[0] == "Full") {
          this.prifull=true


        }

        else{

          let jin={
          cid :this.cid,
          user_id:this.uidlocal,
          tid:tyid
          }
          console.log(jin)

          this.http.post(this.dataS.apiPJ+"/regis/insert", jin)
          .subscribe({
            next: (response) => {
              this.http.get(this.dataS.apiPJ+"/regis/"+this.uidlocal).subscribe((data:any)=>
                {
                  this.applybyuid=applyCVT.toApply(JSON.stringify(data))
                  console.log(this.applybyuid)

                  this.Typeforuid = this.TypeCid.filter(T => {
                    const typeCidModels2 = new Set(this.applybyuid.map(status => status.tid));
                    return !typeCidModels2.has(T.typeID);
                  });
                  console.log(this.Typeforuid)
                })
              this.success = true; // set success to true
            setTimeout(() => {
              this.success = false; // set success back to false after 10 seconds
            }, 5000); // 1000 milliseconds = 1 seconds
            },
            error: (error) => {
              // Handle error
              this.error=true;
              console.error("Error saving data:", error.status);
            },
          });


        }
      })

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
  async addrid(rid:any)
  {
    console.log(rid)
    if(rid == "")
      {
        this.nodata=true;
      }
    else{
      let ji1={
        cid :this.cid,
        }
        console.log(ji1)

        this.http.post(this.dataS.apiPJ+"/search-comp-uid/"+this.uidlocal, ji1)
        .subscribe({
          next: (response) => {
            if(response == "")
              {
                this.http.post(this.dataS.apiPJ+"/refe/id/"+this.uidlocal, ji1)
                .subscribe({
                  next: (response) => {
                    if(response == "")
                      {
                        this.http.post(this.dataS.apiPJ+"/search-apply/"+this.uidlocal, ji1)
                        .subscribe({
                          next: (response) => {
                            if(response == "")
                              {
                                let jin={
                                  cid :this.cid,
                                  user_id:rid
                                  }
                                  console.log(jin)

                                  this.http.post(this.dataS.apiPJ+"/referee/insert", jin)
                                  .subscribe({
                                    next: (response) => {
                                      this.success = true; // set success to true
                                    setTimeout(() => {
                                      this.success = false; // set success back to false after 10 seconds
                                    }, 5000); // 1000 milliseconds = 1 seconds
                                    },
                                    error: (error) => {
                                      // Handle error
                                      this.error=true;
                                      console.error("Error saving data:", error.status);
                                    },
                                  });
                              }
                              else
                              {
                                this.nodata=true;
                              }

                          },
                          error: (error) => {
                            console.error("Error saving data:2", error.status);
                          },
                        });
                      }
                      else
                      {
                        this.nodata=true;
                      }

                  },
                  error: (error) => {
                    console.error("Error saving data:2", error.status);
                  },
                });
              }
              else
              {
                this.nodata=true;
              }

          },
          error: (error) => {
            console.error("Error saving data:1", error.status);
          },
        });
    }
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
onInput(event: any) {
this.inputValue = parseInt(event.target.value);
if (this.inputValue !== undefined && (this.inputValue < this.minAllowedValue  || this.inputValue > this.maxAllowedValue)) {
  this.amount = this.inputValue < this.minAllowedValue ? this.minAllowedValue  : this.maxAllowedValue;

  }
}
onInputO(event: any) {
  this.inputValueO = parseInt(event.target.value);
  if (this.inputValueO !== undefined && (this.inputValueO < this.minAllowedValue  || this.inputValueO > this.maxAllowedValue)) {
    this.amountO = this.inputValueO < this.minAllowedValue ? this.minAllowedValue  : this.maxAllowedValue;

    }
  }

  Atypesel()
  {

    console.log(this.selAthleteselTy)
    let Type1={
      tid :this.selAthleteselTy,
      }
      console.log(Type1)

      this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
      .subscribe({
        next: (response) => {
          this.applyuserAll=applyuserCVT.toApplyuser(JSON.stringify(response))
          console.log(response)
          this.tableapplyuser = new MatTableDataSource<Applyuser>(this.applyuserAll);
                // this.tableapplyuser.paginator = this.paginator;
        },
        error: (error) => {

          this.error=true;
          console.error("Error saving data:", error.status);
        },
      });
  }
}
