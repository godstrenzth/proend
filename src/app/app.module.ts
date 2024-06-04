import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './page/login/login.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterComponent } from './page/register/register.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { ForgetComponent } from './page/forget/forget.component';
import { ResetComponent } from './page/reset/reset.component';
import { HomeComponent } from './page/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CompetitionComponent } from './page/competition/competition.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AdnSingleEliminationTreeModule } from '@adonsio/adn-tournament';
import { AdnTournamentTreeModule } from '@adonsio/adn-tournament';
import { MatchComponent } from './page/match/match.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { StatedialogComponent } from './page/statedialog/statedialog.component';
import { DetaildialogComponent } from './page/detaildialog/detaildialog.component';
import { CreatedialogComponent } from './page/createdialog/createdialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    ForgetComponent,
    ResetComponent,
    HomeComponent,
    CompetitionComponent,
    MatchComponent,
    StatedialogComponent,
    DetaildialogComponent,
    CreatedialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    AdnSingleEliminationTreeModule,
    AdnTournamentTreeModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,





  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
