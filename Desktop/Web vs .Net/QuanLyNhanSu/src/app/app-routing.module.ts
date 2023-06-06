import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeimgComponent } from './components/homeimg/homeimg.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminpageComponent } from './components/adminpage/adminpage.component';
import { NhanvienComponent } from './admin/nhanvien/nhanvien.component';
import { PhongbanComponent } from './admin/phongban/phongban.component';
import { QuanlyluongComponent } from './admin/quanlyluong/quanlyluong.component';

const routes: Routes = [
  {path:'', component:HomeimgComponent},
  {path:'dang-nhap', component:LoginComponent},
  {path:'Admin',component:AdminComponent},
  {path:'adminpage',component:AdminpageComponent},
  {path:'nhan-vien',component:NhanvienComponent},
  {path:'phong-ban',component:PhongbanComponent},
  {path:'luong',component:QuanlyluongComponent},
  {path:'**', component:NotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
