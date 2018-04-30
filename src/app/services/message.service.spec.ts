import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MessageService } from './message.service';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { InputMessage } from '../inputMessage';

describe('MessageService', () => {

  let messageService: MessageService;
  let loginService: LoginService;
  let httpMock: HttpTestingController;
  let inputMessage: InputMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService, LoginService, CookieService]
    });
  });

  beforeEach(inject([HttpClient], (http: HttpClient) => {
    loginService = TestBed.get(LoginService);
    messageService = new MessageService(http, loginService);
    httpMock = TestBed.get(HttpTestingController);
    inputMessage = new InputMessage();
    inputMessage.userId = "testUser";
    inputMessage.msgSummary = "Test Message Summary";
    inputMessage.msgText = "Test Message Text";
  }));

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the message successful', fakeAsync(() => {
    loginService.saveLoginInfo('Vikas');
    messageService.getMessages().subscribe((data: any) => {
      expect(data.userId).toBe('Vikas');
    });
    const req = httpMock.expectOne(`http://localhost:8080/api/messages/Vikas`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush({
      userId: 'Vikas'
    });
    httpMock.verify();
  }));

  it('should return error if server not available', fakeAsync(() => {
    loginService.saveLoginInfo('Vikas');
    messageService.getMessages().subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('ERR_CONNECTION_REFUSED');
    });
  }));

  it('should return error if server has an error', fakeAsync(() => {
    loginService.saveLoginInfo('Vikas');
    messageService.getMessages().subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('SERVER_ERROR');
    });
  }));

  it('should return error if resource is not available', fakeAsync(() => {
    loginService.saveLoginInfo('Vikas');
    messageService.getMessages().subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('NO_RESOURCE_AVAILABLE');
    });
  }));

  it('should post the message successfully', fakeAsync(() => {
    messageService.postMessage(inputMessage).subscribe((data: any) => {
      expect(data.userId).toBe('testUser');
    });
    const req = httpMock.expectOne(`http://localhost:8080/api/message`, 'post to api');
    expect(req.request.method).toBe('POST');
    req.flush({
      userId: 'testUser'
    });
    httpMock.verify();
  }));

  it('should return error if server not available for Post', fakeAsync(() => {
    messageService.postMessage(inputMessage).subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('ERR_CONNECTION_REFUSED');
    });
  }));

  it('should return error if server has an error for Post', fakeAsync(() => {
    messageService.postMessage(inputMessage).subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('SERVER_ERROR');
    });
  }));

  it('should return error if resource is not available for Post', fakeAsync(() => {
    messageService.postMessage(inputMessage).subscribe((data: any) => {
      expect(data.failure.error.type).toBeFalsy('SERVER_ERROR');
    });
  }));
});
