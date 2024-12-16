import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    console.log(route);
    console.log(state);
    const path = state.url;
    console.log('___---> ', path);
    return true;
  }
  // cdfanActivate() {
  //   console.log('route');
  //   this.router.navigate(['/login'])
  //   return true;
  // }
}
