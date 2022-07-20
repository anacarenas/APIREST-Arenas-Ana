import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {
 private urlAPI = 'https://62ce1c42a43bf780086299e4.mockapi.io/';
 constructor(private http: HttpClient) {}
 getUsers(): Observable<User[]> {
   return this.http.get<User[]>(`${this.urlAPI}user`);
 }



}
