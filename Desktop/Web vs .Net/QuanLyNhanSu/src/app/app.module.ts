import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HomeimgComponent } from './components/homeimg/homeimg.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NhanvienComponent } from './admin/nhanvien/nhanvien.component';
import { PhongbanComponent } from './admin/phongban/phongban.component';
import { QuanlyluongComponent } from './admin/quanlyluong/quanlyluong.component';

@NgModule({
  declarations: [
   
        HomeComponent,
        LoginComponent,
        HomeimgComponent,
        NotfoundComponent,
        AdminComponent,
        AdminpageComponent,
        NhanvienComponent,
        PhongbanComponent,
        QuanlyluongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
