import { Component } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-authentication',
    templateUrl: 'authentication.component.html'
})
export class AuthenticationComponent {
    constructor(private authService: AuthService) {}

    //Returns if localstorage is holding a login token, used for auth.
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
