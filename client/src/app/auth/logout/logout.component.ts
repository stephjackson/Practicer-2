//This component used to hold a logout button when user auth was on a page.
//Now that it's in a navbar, it's unused, but I'm keeping it around for posterity.
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-logout',
    template: `
    `
})
export class LogoutComponent {

}