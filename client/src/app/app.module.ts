import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ListFormComponent } from './lists/list-form/list-form.component';
import { YourlistsComponent } from './lists/yourlists/yourlists.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { ListsComponent } from './lists/lists/lists.component';
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ListService } from "./lists/list.service";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    LogoutComponent,
    ListFormComponent,
    YourlistsComponent,
    AuthenticationComponent,
    ListsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    RouterModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AuthService, ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
