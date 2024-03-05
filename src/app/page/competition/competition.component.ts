
import { AdnTournament } from '@adonsio/adn-tournament/lib/declarations/interfaces';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';



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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2: string[] = ['position', 'name', 'weight', 'symbol', 'edit',];
  displayedColumns3: string[] = ['position', 'name', 'close'];
  dataSource = ELEMENT_DATA;
  constructor(private readonly elemant:ElementRef,private render:Renderer2) {

   }
   editRow(a:any)
   {

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
