import {NgModule, Component, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Message } from '../interface/message';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
import { InputMessage } from '../inputMessage';
import { LoginService } from './login.service';

@Injectable()
export class MessageService {
  private apiRoot: string = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  getMessages(): Observable<Message[]> {
    var getUrl = this.apiRoot;
    var username: String = this.loginService.getUserInfo();
    console.log(username);
    if(username != undefined) {
      getUrl = getUrl + "/messages/" + username;
      console.log(getUrl);
    }
    return this.http.get<Message[]>(getUrl)
    .catch(this.handleError); ;
  }

  postMessage(inputMessage:InputMessage) {
    var postUrl = this.apiRoot + '/message';
    return this.http.post(postUrl, inputMessage, { 
      })  
     .map(res =>  <InputMessage>(res))
     .catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) { 
    console.error(error); 
    return Observable.throw(error.message || "Server Error");  
 } 

}
