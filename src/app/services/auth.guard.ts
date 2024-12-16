import { Injectable } from '@angular/core';
import {
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (!this.auth.isLogined()) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
