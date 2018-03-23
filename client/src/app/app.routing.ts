import { Routes, RouterModule } from "@angular/router";
import { ItemsComponent} from './items/items/items.component'
import { ListsComponent } from "./lists/lists/lists.component";
import { ListDetailsComponent } from "./lists/list-details/list-details.component";
import { AuthenticationComponent } from "./auth/authentication/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { ITEM_ROUTES } from './items/item.routes';
import { LIST_ROUTES } from './lists/list.routes';
import { ItemDetailsComponent } from "./items/item-details/item-details.component";
import { SessionViewComponent } from "./lists/session-view/session-view.component";
import { AboutComponent } from "./general/about/about.component";
import { LandingComponent } from "./general/landing/landing.component";

const APP_ROUTES: Routes = [
    { path: '', component: LandingComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'lists/:id', component: ListDetailsComponent },
    { path: 'lists/:id/session', component: SessionViewComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'items', component: ItemsComponent },
    { path: 'items/:id', component: ItemDetailsComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);