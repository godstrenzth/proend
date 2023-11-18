import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderCComponent } from './component/header-c/header-c.component';
import { HeaderSHComponent } from './component/header-sh/header-sh.component';
import { FootComponent } from './component/foot/foot.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { ShopComponent } from './page/shop/shop.component';
import { CusComponent } from './page/cus/cus.component';
import { MatSelectionList } from '@angular/material/list';
import{MatListModule}from'@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DiaComponent } from './page/dia/dia.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { OrdercusComponent } from './page/ordercus/ordercus.component';
import { LogshopComponent } from './page/logshop/logshop.component';





@NgModule({

  declarations: [
    AppComponent,
    HeaderCComponent,
    HeaderSHComponent,
    FootComponent,
    ShopComponent,
    CusComponent,
    DiaComponent,
    LoginComponent,
    OrdercusComponent,
    LogshopComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatListModule,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,





  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
