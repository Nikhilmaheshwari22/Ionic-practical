import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   // api server
   public URL = 'https://reqres.in';
   public URL1 ='https://fakestoreapi.com/';
   public URL2 ='https://dummyjson.com/'

   constructor(public http: HttpClient, private authenticatinService: AuthenticationService) {
   }


   signIn(email: any, password:any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     return this.http
       .post(`${this.URL}/api/login`, {email:email,password:password},{headers:header})
       .pipe(
         (map(response => response)),
         catchError((error: any) => of(error))
       );
   }


   products(): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     return this.http
       .get(`${this.URL2}products`,{headers:header})
       .pipe(
         (map(response => response)),
         catchError((error: any) => of(error))
       );
   }

   searchProducts(search:string): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
     return this.http
       .get(`${this.URL2}search?q=${search}`,{headers:header})
       .pipe(
         (map(response => response)),
         catchError((error: any) => of(error))
       );
   }
}
