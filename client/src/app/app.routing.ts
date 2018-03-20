import { Routes, RouterModule } from "@angular/router";

import { ListsComponent } from "./lists/lists/lists.component";
import { AuthenticationComponent } from "./auth/authentication/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
    { path: 'lists', component: ListsComponent },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);