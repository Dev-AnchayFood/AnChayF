import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {

  constructor(private http: HttpClient) { }
    // pt #

  getList(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/nhan-vien');
  }
  getById(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/nhan-vien/1');
  }
}