import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageGridComponent } from './message-grid.component';
import { AgGridModule, BaseComponentFactory } from 'ag-grid-angular';
import { MessageService } from '../../services/message.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

describe('MessageGridComponent', () => {
  let component: MessageGridComponent;
  let fixture: ComponentFixture<MessageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AgGridModule, HttpClientModule ],
      declarations: [ MessageGridComponent ],
      providers: [ MessageService, LoginService, CookieService, BaseComponentFactory ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
