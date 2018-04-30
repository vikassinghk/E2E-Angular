import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate() {
    var username = this.loginService.getUserInfo();
    if (username === undefined || username == null || username == '') {
      this.router.navigate(['login']);
    } else {
      return true;
    }
  }

}
