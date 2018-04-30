import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MessageGridComponent } from './components/message-grid/message-grid.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: MessageGridComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'api/messages',
    component: MessageGridComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'api/createMessge',
    component: MessageFormComponent,
    canActivate : [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [LoginComponent, MessageFormComponent, MessageGridComponent]
