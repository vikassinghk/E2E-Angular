import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  private LOGIN_KEY = 'loginCookie';

  constructor(private cookieService: CookieService) { }

  saveLoginInfo(username: string) {
    this.cookieService.set(this.LOGIN_KEY, username);
  }

  removeLoginInfo() {
    console.log("User Logged out");
    return this.cookieService.delete(this.LOGIN_KEY);
  }

  getUserInfo() {
    return this.cookieService.get(this.LOGIN_KEY);
  }

}
