import { Location } from "@angular/common";
import { TestBed, fakeAsync, async, tick } from '@angular/core/testing';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './components/login/login.component';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { LoginService } from "./services/login.service";

describe('AppRoutingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let loginService: LoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, AgGridModule],
      declarations: [LoginComponent, MessageGridComponent, MessageFormComponent]
    }).compileComponents();
  }));

  router = TestBed.get(Router);
  location = TestBed.get(Location);
  loginService = TestBed.get(LoginService);

  fixture = TestBed.createComponent(AppComponent);
  router.initialNavigation();

  it('without authentication - navigate to "" redirects you to /login', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('without authentication - navigate to "/api/messages" redirects you to /login', fakeAsync(() => {
    router.navigate(['/api/messages']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('without authentication - navigate to "/api/createMessage" redirects you to /login', fakeAsync(() => {
    router.navigate(['/api/createMessage']);
    tick();
    expect(location.path()).toBe('/login');
  }));

  it('with authentication - navigate to "" redirects you to /api/messages', fakeAsync(() => {
    loginService.saveLoginInfo("Vikas");
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/api/messages');
  }));

  it('with authentication - navigate to "/api/messages" redirects you to /api/messages', fakeAsync(() => {
    loginService.saveLoginInfo("Vikas");
    router.navigate(['/api/messages']);
    tick();
    expect(location.path()).toBe('/api/messages');
  }));

  it('with authentication - navigate to "/api/createMessage" redirects you to /api/createMessage', fakeAsync(() => {
    loginService.saveLoginInfo("Vikas");
    router.navigate(['/api/createMessage']);
    tick();
    expect(location.path()).toBe('/api/createMessage');
  }));
});
