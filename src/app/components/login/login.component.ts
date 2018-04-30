import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {


  public loginData = { username: "" };


  constructor(private loginService: LoginService, private router: Router) { }

  login() {
    this.loginService.saveLoginInfo(this.loginData.username);
    this.router.navigate(['']);
  }

}
