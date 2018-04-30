import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  template: `
  <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">E2E Testing</a>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/api/createMessge">Create Message</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/api/messages">Show Messages</a>
      </li>
    </ul>
        <a *ngIf="!isLoggedIn" id="login" class="nav-link" (click)="login()" style="color: #0000ff; cursor:pointer;">
          <span>Login</span>
          <i class="fa fa-sign-in fa-2x" aria-hidden="true" ></i>
        </a>
        <a *ngIf="isLoggedIn" id="logout" class="nav-link" (click)="logout()" style="color: #0000ff; cursor:pointer;">
          <span>Logout</span>
          <i class="fa fa-sign-out fa-2x" aria-hidden="true" ></i>
        </a>
  </div>
</nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public username: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.username = this.loginService.getUserInfo();
    if (this.username === undefined || this.username == null || this.username == '') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
    }

  }

  logout() {
    this.loginService.removeLoginInfo();
    console.log("User Logged out");
    this.router.navigate(['/login']);
  }

  login() {
      this.router.navigate(['/login']);
  }

}
