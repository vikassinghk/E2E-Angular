import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormComponent } from './message-form.component';
import { MessageService } from '../../services/message.service';
import { LoginService } from '../../services/login.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('MessageFormComponent', () => {
  let component: MessageFormComponent;
  let fixture: ComponentFixture<MessageFormComponent>;

  let messageService: MessageService
  let loginService: LoginService;

  let submitBtn;
  let summary;
  let text;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, HttpClientModule ],
      declarations: [MessageFormComponent],
      providers: [MessageService, LoginService, CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFormComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check submtBtn is disabled initially', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(submitBtn.disabled).toBe(true);
    })
  });

  it('should check loginBtn is enabled after inputs check out', async(() => {
    fixture.detectChanges();
    summary = fixture.debugElement.query(By.css('.msgSummary')).nativeElement;
    text = fixture.debugElement.query(By.css('.msgText')).nativeElement;
    summary.value = 'Test summary';
    summary.dispatchEvent(new Event('change'));
    text.value = 'Test text';
    text.dispatchEvent(new Event('change'));
     fixture.whenStable().then(() => {
      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css(".submitBtn"));
      expect(submitBtn.disabled).toBe(false);
    });
  }));

  it('should display the message list page when Submit button is clicked', () => {
    fixture.detectChanges();
    summary = fixture.debugElement.query(By.css('.msgSummary')).nativeElement;
    text = fixture.debugElement.query(By.css('.msgText')).nativeElement;
    summary.value = 'Test summary';
    summary.dispatchEvent(new Event('change'));
    text.value = 'Test text';
    text.dispatchEvent(new Event('change'));
     fixture.whenStable().then(() => {
      fixture.detectChanges();
      submitBtn = fixture.debugElement.query(By.css(".submitBtn"));
      submitBtn.dispatchEvent(new Event('click'));
      expect(fixture.debugElement.query(By.css('.mainContent'))).toContain(".messageGrid");
    });
  });
});
