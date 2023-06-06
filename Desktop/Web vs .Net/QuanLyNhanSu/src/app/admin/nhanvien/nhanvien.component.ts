import { Component, OnInit } from '@angular/core';
import { NhanvienService } from 'src/app/services/nhanvien.service';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
  
 nhanviens:any;
  constructor(private nhanvien:NhanvienService){}
  ngOnInit(): void {
    this.nhanvien.getList().subscribe(res => {
      this.nhanviens = res;
      console.log(this.nhanviens)
    }  )
  }
}
