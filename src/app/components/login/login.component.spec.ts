import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MessageService } from '../../services/message.service';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;
  let router: Router;

  let loginBtn;
  let username;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [LoginComponent],
      providers: [LoginService, CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check loginBtn is disabled initially', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(loginBtn.disabled).toBe(true)
    })
  });

  it('should check loginBtn is enabled after inputs check out', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      loginBtn = fixture.debugElement.query(By.css('.loginButton')).nativeElement;
      username = fixture.debugElement.query(By.css('#username')).nativeElement;
      username.value = 'Vikas';
      username.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(loginBtn.disabled).toBe(true)
      })
    })
  }));

  it('should display the message list page when login button is clicked', () => {
    fixture.detectChanges();
    loginBtn = fixture.debugElement.query(By.css('.loginButton')).nativeElement;
    username = fixture.debugElement.query(By.css('#username')).nativeElement;
    username.value = 'Vikas';
    username.dispatchEvent(new Event('change'));
     fixture.whenStable().then(() => {
      fixture.detectChanges();
      loginBtn = fixture.debugElement.query(By.css(".loginButton"));
      loginBtn.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.mainContent'))).toContain(".messageGrid");
    });
  });
});
