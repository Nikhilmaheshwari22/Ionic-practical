import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  authenticated: boolean | undefined;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }


canActivate(): boolean {
  if (!this.authenticationService.isAuthenticated()) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
}
