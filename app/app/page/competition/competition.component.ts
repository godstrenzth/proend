
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
import { Convert as vsCVT,Vs } from 'src/app/model/vs.model';
import { CreatedialogComponent } from '../createdialog/createdialog.component';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { DetildialogoneComponent } from '../detildialogone/detildialogone.component';



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
  //myTournamentData: AdnTournament =this.rounds
  rounds1: AdnTournament={rounds: [
      {
        "type": "Winnerbracket",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      },
      {
        "type": "Winnerbracket",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      },
      {
        "type": "Final",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      }
    ]
  }
  myTournamentData: AdnTournament ={
    rounds: [
      {
        "type": "Winnerbracket",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      },
      {
        "type": "Winnerbracket",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          },
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      },
      {
        "type": "Final",
        "matches": [
          {
            "teams": [
              { "name": "Empty", "score": 0 },
              { "name": "Empty", "score": 0 }
            ]
          }
        ]
      }
    ]
  }



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['position', 'name','Detail'];
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
  VSmatch=Array<Vs>()
  applyuserAllforrandom=Array<Applyuser>()
  applyuserAllforPoomsae=Array<Applyuser>()

  uidlocal:any
  cid:any
  error:any
  success:any
  noregis:any
  nodata:any
  prifull:any
  img64:any
  creother=false
  allow:any



  amount=1
  inputValue: number | undefined;
  amountO=1
  inputValueO: number | undefined;
  minAllowedValue: number = 1;
  maxAllowedValue: number = 16;
  selAthleteselTy:any| undefined;
  selAthleteselTymatch:any| undefined;
  selAthleteselTymatchname:any| undefined;
  PandK:any

  tableapplyuser:any
  rid: any;
  datePipe: any;
  today : any;

  constructor(private readonly elemant:ElementRef,private render:Renderer2,private route: ActivatedRoute,
    private rou:Router,private dataS:DataService,private dia:MatDialog,private http:HttpClient
    )
    {
      this.route.params.subscribe(params => {
        this.cid = params['cid'];
       // Output the value of cid
      });
      this.uidlocal= localStorage.getItem('uid')
      this.statuslocal= localStorage.getItem('status')
      console.log(this.statuslocal)
      this.Type=dataS.dataT1
      this.datePipe = new DatePipe('en-US');
      this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.http.get(this.dataS.apiPJ+"/compets/id/"+this.cid).subscribe((data:any)=>
        {
          this.competM=competCVT.toCompets(JSON.stringify(data))
          console.log(this.competM)
        })
        // Aut type
        this.http.get(this.dataS.apiPJ+"/regis/"+this.uidlocal).subscribe((data:any)=>
          {
            this.applybyuid=applyCVT.toApply(JSON.stringify(data))
            console.log(this.applybyuid)
          })
      this.http.get(this.dataS.apiPJ+"/tkd/"+this.cid).subscribe((data:any)=>
        {
          this.TypeCid=typeCVT.toType(JSON.stringify(data))
          console.log(this.TypeCid)


          if(this.TypeCid.length > 0){
            this.selAthleteselTy=String(this.TypeCid[0].typeID)
            this.selAthleteselTymatch=String(this.TypeCid[0].typeID)
            this.selAthleteselTymatchname=this.TypeCid[0].model
            this.TypeVaild = this.Type.filter(T => {
              const typeCidModels = new Set(this.TypeCid.map(status => status.model));
              return !typeCidModels.has(T.T);
            });
            this.Typeforuid = this.TypeCid.filter(T => {
              const typeCidModels2 = new Set(this.applybyuid.map(status => status.tid));
              return !typeCidModels2.has(T.typeID);
            });
            console.log(this.Typeforuid,"typeforuid")
            console.log(this.TypeVaild,"TypeVaild")

          }else{
            this.TypeVaild = this.Type
            this.Typeforuid = this.TypeCid.filter(T => {
              const typeCidModels2 = new Set(this.applybyuid.map(status => status.tid));
              return !typeCidModels2.has(T.typeID);
            });
            console.log(this.Typeforuid,"typeforuid")
          }

          if(this.selAthleteselTymatchname.includes("Kyorugi"))
            {
          //matchallType
              this.PandK=true
              this.http.get(this.dataS.apiPJ+"/match/AllDetail/"+this.selAthleteselTymatch)
              .subscribe({
                next: (response) => {
                  this.VSmatch=vsCVT.toVs(JSON.stringify(response))
                  console.log(this.VSmatch)
                  console.log("this.myTournamentData");
                  console.log(this.myTournamentData);
                  if(this.VSmatch.length > 0)
                    {
                      // const rounds = this.transformToRounds(this.VSmatch);
                      // const a : AdnTournament={
                      //   rounds: []
                      // };
                      // a.rounds = rounds;
                      // this.myTournamentData=a
                      // console.log(JSON.stringify(a));

                      // console.log(a);
                      // console.log(rounds);
                      const a: AdnTournament = this.transformToRounds(this.VSmatch);
                      this.myTournamentData=a
                      console.log(a);

                    }
                  else{
                    this.myTournamentData=this.rounds1
                  }


                },
                error: (error) => {

                  this.error=true;
                  console.error("Error saving data:", error.status);
                },
              });
            }
            else if(this.selAthleteselTymatchname.includes("Poomsae"))
              {
                this.PandK=false
                let Type1={
                  tid :this.selAthleteselTymatch,
                  }
                  console.log(Type1)

                  this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
                  .subscribe({
                    next: (response) => {
                      this.applyuserAllforPoomsae=applyuserCVT.toApplyuser(JSON.stringify(response))
                      this.applyuserAllforPoomsae.sort((a, b) => {
                        const scoreA = a.score ?? Infinity; // Use nullish coalescing with Infinity
                        const scoreB = b.score ?? Infinity; // Use nullish coalescing with Infinity

                        return scoreA - scoreB;
                      });

                      console.log(response)


                            // this.tableapplyuser.paginator = this.paginator;
                    },
                    error: (error) => {

                      this.error=true;
                      console.error("Error saving data:", error.status);
                    },
                  });
              }
          console.log(this.TypeVaild)
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
          console.log("-----------------------")
          console.log(this.refA)
          console.log("-----------------------")
          // this.dataSource2 = new MatTableDataSource<Referee>(this.refA);


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
   //connnnnnnnn!!!!!!!!!!!!!!!!!!!!!!!!!!!!



   editRow(a:any)
   {
    console.log(a)
    this.http.delete(this.dataS.apiPJ+"/referee/delete/"+a.rid).subscribe((data:any)=>
      {
        this.http.get(this.dataS.apiPJ+"/referee/"+this.cid).subscribe((data:any)=>
          {
            this.refA=refereeCVT.toReferee(JSON.stringify(data));
            console.log("reffff")
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
  formatDate(dateString: string) {
    const dateComponents = dateString.split('/');
    const rearrangedComponents = [dateComponents[2], dateComponents[1], dateComponents[0]];
    return rearrangedComponents.join('/');
  }
  async save(name:any,detail:any,place:any,img:any,contact:any,date:any)
  {
    console.log(name+"|"+detail+"|"+place+"|"+img.value+"|"+contact+"|"+date)
    console.log(this.formatDate(date))
    const convertedDateString = this.competM[0].regis_end.replace(/-/g, "/");
    console.log(this.competM[0].competName+"|"+this.competM[0].detail+"|"+this.competM[0].place+"|"+this.competM[0].poster+"|"+this.competM[0].contact+"|"+this.competM[0].regis_end)
    if(name == "" || place == ""    ||detail  == "" || date  == "" || contact  == "" )
      {
        this.nodata=true;
        console.log("1"+name+"|"+detail+"|"+place+"|"+img.value+"|"+contact+"|"+date)
      }
    else if(name == this.competM[0].competName && place == this.competM[0].place&&detail  == this.competM[0].detail
      && this.formatDate(date)  == convertedDateString && contact  == this.competM[0].contact && img.value == "")
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
        regis_end:this.formatDate(date),
        detail:detail,
        contact:contact,
        place:place,


        }

        let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/update-compets-nof/"+this.cid,jin,{}))
        this.http.get(this.dataS.apiPJ+"/compets/id/"+this.cid).subscribe((data:any)=>
          {
            this.competM=competCVT.toCompets(JSON.stringify(data))
            console.log(this.competM)
          })
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
      regis_end:this.formatDate(date),
      detail:detail,
      contact:contact,
      place:place,
      poster:this.img64

      }
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/update-compets/"+this.cid,jin,{}))
      this.http.get(this.dataS.apiPJ+"/compets/id/"+this.cid).subscribe((data:any)=>
        {
          this.competM=competCVT.toCompets(JSON.stringify(data))
          console.log(this.competM)
        })
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
      model:model,
      amount:this.amount
      }
      console.log(jin)
      let data:any= await lastValueFrom(this.http.post(this.dataS.apiPJ+"/tkd",jin,{}))
      this.http.get(this.dataS.apiPJ+"/tkd/"+this.cid).subscribe((data:any)=>
        {
          this.TypeCid=typeCVT.toType(JSON.stringify(data))
          console.log(this.TypeCid)

          this.selAthleteselTy=String(this.TypeCid[0].typeID)
          this.selAthleteselTymatch=String(this.TypeCid[0].typeID)
          this.selAthleteselTymatchname=this.TypeCid[0].model
          this.TypeVaild = this.Type.filter(T => {
            const typeCidModels = new Set(this.TypeCid.map(status => status.model));
            return !typeCidModels.has(T.T);
          });
          console.log(this.TypeVaild)

        })
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
        model:Cmodel,
        amount:this.amountO
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
          type_user :0,
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
  async addrid(rid:any,typeid:any)
  {
    console.log(rid)
    if(rid == "")
      {
        this.nodata=true;
        console.log("string")
      }
    else{
      let ji1={
        cid :this.cid,
        }
        console.log(ji1)

        this.http.post(this.dataS.apiPJ+"/search-comp-uid/"+rid, ji1)
        .subscribe({
          next: (response) => {
            if(response == "")
              {
                // this.http.post(this.dataS.apiPJ+"/refe/id/"+this.uidlocal, ji1)
                // .subscribe({
                //   next: (response) => {
                //     if(response == "")
                //       {
                        this.http.post(this.dataS.apiPJ+"/search-apply/"+rid, ji1)
                        .subscribe({
                          next: (response) => {
                            if(response == "")
                              {
                                let jin={
                                  type_user :1,
                                  user_id:rid,
                                  tid:typeid

                                  }
                                  console.log(jin)

                                  this.http.post(this.dataS.apiPJ+"/regis/insert", jin)
                                  .subscribe({
                                    next: (response) => {
                                      this.http.get(this.dataS.apiPJ+"/referee/"+this.cid).subscribe((data:any)=>
                                        {
                                          this.refA=refereeCVT.toReferee(JSON.stringify(data));
                                          console.log(this.refA)
                                           // this.dataSource2 = new MatTableDataSource<Referee>(this.refA);


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
                              else
                              {
                                this.nodata=true;
                              }

                          },
                          error: (error) => {
                            console.error("Error saving data:2", error.status);
                          },
                        });
                //       }
                //       else
                //       {
                //         this.nodata=true;
                //       }

                //   },
                //   error: (error) => {
                //     console.error("Error saving data:2", error.status);
                //   },
                // });
              }
              else
              {
                this.nodata=true;
                console.log("else")
              }

          },
          error: (error) => {
            console.error("Error saving data:1", error.status);
          },
        });
    }
  }
  delrid(aid :any)
  {

    this.http.delete(this.dataS.apiPJ+"/regis/delete/"+aid).subscribe((data:any)=>
      {
        this.http.get(this.dataS.apiPJ+"/referee/"+this.cid).subscribe((data:any)=>
          {
            this.refA=refereeCVT.toReferee(JSON.stringify(data));
            console.log(this.refA)
          })
        this.success = true; // set success to true
        setTimeout(() => {
          this.success = false; // set success back to false after 10 seconds
        }, 5000);
    })

  }
  opnediauserDetailview(id : any)
  {

    this.dia.open(DetildialogoneComponent, {
      data: {uid: id},
    });
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
  Atypeselmatch(modelAthletesel:any)
  {

    const PK=this.TypeCid.filter(t => t.typeID ==modelAthletesel);
    this.selAthleteselTymatchname=PK[0].model

    console.log(this.selAthleteselTymatch)
    console.log(PK[0].model)
    // //applyallType
    // let Type1={
    //   tid :this.selAthleteselTymatch,
    //   }
    //   console.log(Type1)

    //   this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
    //   .subscribe({
    //     next: (response) => {
    //       this.applyuserAll=applyuserCVT.toApplyuser(JSON.stringify(response))
    //       console.log(response)
    //       this.tableapplyuser = new MatTableDataSource<Applyuser>(this.applyuserAll);
    //             // this.tableapplyuser.paginator = this.paginator;
    //     },
    //     error: (error) => {

    //       this.error=true;
    //       console.error("Error saving data:", error.status);
    //     },
    //   });
      if(this.selAthleteselTymatchname.includes("Poomsae"))
        {
          this.PandK=false
          let Type1={
            tid :this.selAthleteselTymatch,
            }
            console.log(Type1)

            this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
            .subscribe({
              next: (response) => {
                this.applyuserAllforPoomsae=applyuserCVT.toApplyuser(JSON.stringify(response))
                this.applyuserAllforPoomsae.sort((a, b) => {
                  const scoreA = a.score === null ? -Infinity : a.score; //
                  const scoreB = b.score === null ? -Infinity : b.score;

                  return scoreB - scoreA;
                });
                console.log(response)

                      // this.tableapplyuser.paginator = this.paginator;
              },
              error: (error) => {

                this.error=true;
                console.error("Error saving data:", error.status);
              },
            });
        }
      else if(this.selAthleteselTymatchname.includes("Kyorugi"))
        {
      //matchallType
        this.PandK=true
          this.http.get(this.dataS.apiPJ+"/match/AllDetail/"+this.selAthleteselTymatch)
          .subscribe({
            next: (response) => {
              this.VSmatch=vsCVT.toVs(JSON.stringify(response))
              console.log(this.VSmatch)


              if(this.VSmatch.length > 0)
                {
                  // const rounds = this.transformToRounds(this.VSmatch);
                  //const rounds = this.transformToRounds(con);
                  // const a = {
                  //   rounds:[]
                  // };

                  // const a : AdnTournament={
                  //   rounds: []
                  // };
                  //a.rounds = rounds;
                  const a: AdnTournament = this.transformToRounds(this.VSmatch);
                  this.myTournamentData=a
                  console.log(a);


                }
                else{
                  this.myTournamentData=this.rounds1
                }

            },
            error: (error) => {

              this.error=true;
              console.error("Error saving data:", error.status);
            },
          });

        }
  }
  transformToRounds2(data: any) {
    // const rounds:any = {};

    // for (const item of data  ) {
    //   const round = item.round;
    //   const type = round > 0 ? 'Winnerbracket' : 'Final';
    //   // const currentIndex = [...data].indexOf(item);

    //   if (!rounds[round]) {
    //     rounds[round] = {
    //       type,
    //       matches: []
    //     };
    //   }

    //   const user1 = { name: item.User_1_Name, score: item.score_u1 };
    //   const user2 = { name: item.User_2_Name, score: item.score_u2 };
    //   rounds[round].matches.push({ teams: [user1, user2] });
    // }

    const rounds: any[] = [];

    for (const item of data) {
      const round = item.round;
      const type = round > 0 ? 'Winnerbracket' : 'Final';

      const existingRound = rounds.find(r => r.round == round);
      console.log(existingRound)

      if (!existingRound) {
        rounds.push({
          round,
          type,
          matches: []
        });

      }


      const user1 = { name: item.User_1_Name, score: item.score_u1 };
      const user2 = { name: item.User_2_Name, score: item.score_u2 };
      existingRound?.matches.push({ teams: [user1, user2] });
    }

    return rounds;
  }
   transformToRounds(data: any): AdnTournament {

    const rounds: any[] = [];

    data.forEach((item: { round: any; User_1_Name: any; score_u1: any; User_2_Name: any; score_u2: any; }) => {
    const round = item.round;
    const type = round > 0 ? 'Winnerbracket' : 'Final';

    // Check if a round with the same value exists, but allow for creating a new round on the first encounter
    const existingRound = rounds.find(r => r.round === round) || {};

    existingRound.round = round; // Ensure round property is set
    existingRound.type = type; // Set type if the round is new

    if (!existingRound.matches) {
      existingRound.matches = []; // Initialize matches array on first encounter
    }

    const user1 = { name: item.User_1_Name, score: item.score_u1 };
    const user2 = { name: item.User_2_Name, score: item.score_u2 };
    existingRound.matches.push({ teams: [user1, user2] });

    // Add the (potentially modified) existingRound to the rounds array
    rounds.push(existingRound);
  });

  // Remove duplicate rounds (optional for efficiency, may not be necessary)
  const uniqueRounds = [...new Set(rounds.map(r => JSON.stringify(r)))].map(r => JSON.parse(r));

  return { rounds: uniqueRounds }; // Return the AdnTournament structure with rounds

  }
  randomall()
  {
    const typekyorugi=this.TypeCid.filter(t => t.model.includes("Kyorugi"));
    console.log(typekyorugi)

    for(const item of typekyorugi)
      {
        let Type1={
          tid :item.typeID,
          }
          this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
          .subscribe({
            next: (response) => {
              this.applyuserAllforrandom=applyuserCVT.toApplyuser(JSON.stringify(response))
              console.log("----------------------")
              console.log(item.typeID)
              console.log(this.applyuserAllforrandom.length)

              if(this.applyuserAllforrandom.length != 0)
                {
                  //const player=Math.log2(this.applyuserAllforrandom.length);
                  this.applyuserAllforrandom.length =6
                  if(this.applyuserAllforrandom.length % 2 == 0){
                    console.log("even")
                    const player=Math.log2(this.applyuserAllforrandom.length);
                    console.log(player)
                    const roundedPlayer = Math.round(player);
                    console.log('Rounded player value:', roundedPlayer);
                    console.log("----------------------")
                    if((this.applyuserAllforrandom.length / 2) % 2==0 ){
                      console.log("even && /2 bestcase")
                    }
                    else{
                      console.log("odd && /2 add round for odd")
                    }
                  }
                  else {
                    console.log("odd")
                  }
                }

            },
            error: (error) => {

              this.error=true;
              console.error("Error saving data:", error.status);
            },
          });

      }
  }



  randomall2()
  {
    const typekyorugi=this.TypeCid.filter(t => t.model.includes("Kyorugi"));
    console.log(typekyorugi)

    for(const item of typekyorugi)
      {
        let Type1={
          tid :item.typeID,
          }
          this.http.post(this.dataS.apiPJ+"/regis/compe/"+this.cid, Type1)
          .subscribe({
            next: (response) => {
              this.applyuserAllforrandom=applyuserCVT.toApplyuser(JSON.stringify(response))
              console.log("----------------------")
              console.log(item.typeID)
              console.log(this.applyuserAllforrandom.length)

              if(this.applyuserAllforrandom.length != 0)
                {
                  const round=this.calculateTournamentMatches(this.applyuserAllforrandom.length)
                  const plyer=this.applyuserAllforrandom
                  let oddplyer
                  let randomIndex
                  let count=0
                  let temp
                  if(plyer.length%2 != 0)
                  {
                    randomIndex = Math.floor(Math.random() * plyer.length);
                    oddplyer=plyer[randomIndex].aid


                    let macthinsert={
                      aid1:oddplyer,
                      tid :item.typeID,
                      round: 1
                      }
                      plyer.splice(randomIndex, 1);
                      this.http.post(this.dataS.apiPJ+"/match/insert", macthinsert)
                      .subscribe({
                      next: (response) => {
                      },
                      error: (error) => {
                        this.error=true;
                        console.error("Error saving data:", error.status);
                      },
                      });

                    let macthinsertbye={
                      aid1:oddplyer,
                      tid :item.typeID,
                      round: 2
                      }

                      this.http.post(this.dataS.apiPJ+"/match/insert", macthinsertbye)
                      .subscribe({
                      next: (response) => {
                      },
                      error: (error) => {
                        this.error=true;
                        console.error("Error saving data:", error.status);
                      },
                      });
                  }

                  while (plyer.length > 0) {
                    // randomIndex = Math.floor(Math.random() * plyer.length);
                    // console.log("del"+plyer[randomIndex])
                    count += 1
                    if (count ==1)
                    {
                      randomIndex = Math.floor(Math.random() * plyer.length);
                      temp=plyer[randomIndex].aid
                      plyer.splice(randomIndex, 1);
                    }
                    else if (count == 2 && temp) {
                      count=0
                      randomIndex = Math.floor(Math.random() * plyer.length);

                      let macthinsert={
                        aid1:temp,
                        aid2:plyer[randomIndex].aid,
                        tid :item.typeID,
                        round: 1
                        }
                      plyer.splice(randomIndex, 1);
                      this.http.post(this.dataS.apiPJ+"/match/insert", macthinsert)
                      .subscribe({
                      next: (response) => {

                      },
                      error: (error) => {
                        this.error=true;
                        console.error("Error saving data:", error.status);
                      },
                      });
                    }
                    let nround=round/2;
                    let countround=2
                    while(nround>=2)
                    {

                      let macthinsertbye={
                        tid :item.typeID,
                        round: countround
                        }

                        this.http.post(this.dataS.apiPJ+"/match/insert", macthinsertbye)
                        .subscribe({
                        next: (response) => {
                        },
                        error: (error) => {
                          this.error=true;
                          console.error("Error saving data:", error.status);
                        },
                        });
                        nround=nround/2
                        countround+=1

                    }
                    let macthinsertfinal={
                      tid :item.typeID,
                      round: 0
                      }

                      this.http.post(this.dataS.apiPJ+"/match/insert", macthinsertfinal)
                      .subscribe({
                      next: (response) => {
                      },
                      error: (error) => {
                        this.error=true;
                        console.error("Error saving data:", error.status);
                      },
                      });






                    }

                  console.log(round)
                }

            },
            error: (error) => {

              this.error=true;
              console.error("Error saving data:", error.status);
            },
          });

      }
  }
   calculateTournamentMatches(numberOfPlayers:any) {
    if (numberOfPlayers <= 1) {
      return 1; // 1 or 2 players = 1 match
    }
    if (numberOfPlayers == 3) {
      return 2;
    }
    if (numberOfPlayers == 9) {
      return 8;
    }
    if (numberOfPlayers == 17) {
      return 16;
    }
    if (numberOfPlayers == 33) {
      return 32;
    }
    if (numberOfPlayers == 65) {
      return 64;
    }

    // Calculate the number of matches in Round 1
    let firstRoundMatches = Math.floor(numberOfPlayers / 2); // Calculate initial number of matches

    // Round up to the nearest power of 2
    let powerOfTwo = 1;
    while (powerOfTwo < firstRoundMatches) {
      powerOfTwo *= 2;
    }
    firstRoundMatches = powerOfTwo;

    return firstRoundMatches;
  }




  opensearch()
  {

    //  this.rou.navigate(['/home']);
    window.open('/home/4', '_blank');

  }


}
function log2(arg0: number) {
  throw new Error('Function not implemented.');
}

