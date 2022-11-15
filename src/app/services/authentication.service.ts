import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
const STORED_USER = 'user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any> | undefined;
  public currentUser: Observable<any> | undefined;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router :Router) {
    this.platform.ready().then(async () => {
      let userData = await localStorage.getItem('user');
      if(userData){
          this.currentUserSubject = new BehaviorSubject<any>(this.getUserstate(userData));
          return this.currentUserSubject.value;
    }
    });
  }

  login(data: any) {
    console.log(data)
    localStorage.setItem('user',data);
    this.router.navigate(['tabs/tabs/tab1']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);

  }

  async isAuthenticated() {
    let userData = await localStorage.getItem('user');
    if(userData){
        this.currentUserSubject = new BehaviorSubject<any>(this.getUserstate(userData));
        return this.currentUserSubject.value;
  }
}

   getUser() {
    return localStorage.getItem('user');

  }


  getUserstate(user: any) {
    return (user != null) ? true : false;
  }
}


