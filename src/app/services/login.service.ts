import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  constructor(private http : HttpClient) { }

 // get current user 
 public getCurrentUser(){
  return this.http.get(`${baseUrl}/current-user`);
}

  // generate token from

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/authenticate`,loginData);
  }

  // set user tokens local storeragte

  public loginUser(token:any) {
    this.loginStatusSubject.next(true);
    localStorage.setItem('token',token);
  
    return true;
  }

  // login in or  not 
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined|| tokenStr ==''||tokenStr == null){
      return false;
    } else {
      return true;
    }
  }

  // logout

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get tokenStr
  public getToken(){
    return localStorage.getItem('token');
  }
  // set User Detail

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  // get user details

  public getUser(){
    let userStr = localStorage.getItem('user');

    if(userStr!= null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role local
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

 
}
