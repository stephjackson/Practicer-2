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
import { ItemsComponent } from './items/items/items.component';
import { YouritemsComponent } from './items/youritems/youritems.component';
import { ItemFormComponent } from './items/item-form/item-form.component';
import { ItemService } from './items/item.service';
import { ListDetailsComponent } from './lists/list-details/list-details.component';
import { UnusedItemsComponent } from './lists/unused-items/unused-items.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemStatsComponent } from './items/item-stats/item-stats.component';
import { SessionViewComponent } from './lists/session-view/session-view.component'
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './items/chart/chart.component';

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
    HeaderComponent,
    ItemsComponent,
    YouritemsComponent,
    ItemFormComponent,
    ListDetailsComponent,
    UnusedItemsComponent,
    ItemDetailsComponent,
    ItemStatsComponent,
    SessionViewComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [AuthService, ListService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
