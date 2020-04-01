import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddDetail } from './request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http : HttpClient
  ) {}

  addUser(user:  AddDetail){
    return this.http.post(`http://localhost:8001/user/add`,user);
  }

  getOneById(id:string){
    return this.http.get(`http://localhost:8001/user/${id}`);
  }

  getAll(search: string,page: number,perPageData: number,sort:string,order:number){
    return this.http.get(`http://localhost:8001/user?search=${search}&page=${page}&perPageData=${perPageData}&sort=${sort}&order=${order}`);
  }

  updateUSer(id: string,user: AddDetail){
    return this.http.put(`http://localhost:8001/user/update/${id}`,user);
  }

  deleteUser(id: string){
    return this.http.delete(`http://localhost:8001/user/delete/${id}`);
  }

}
