import { Routes } from "@angular/router";
import { ListDetailsComponent } from './list-details/list-details.component'

export const LIST_ROUTES: Routes = [
    { path: '', redirectTo: 'items', pathMatch: 'full' },
    { path: ':id', component: ListDetailsComponent },
];