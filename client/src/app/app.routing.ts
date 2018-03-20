import { Routes, RouterModule } from "@angular/router";
import { ItemsComponent} from './items/items/items.component'
import { ListsComponent } from "./lists/lists/lists.component";
import { AuthenticationComponent } from "./auth/authentication/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";
import { ITEM_ROUTES } from './items/item.routes'

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'lists', component: ListsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: 'items', component: ItemsComponent, children: ITEM_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);