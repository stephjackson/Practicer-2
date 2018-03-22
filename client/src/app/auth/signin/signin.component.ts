import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../user.model";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
  myForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  // Sets the token in localstorage on signin and resets form.
  // The token implementation is somewhat barebones - the user object needs
  // a "last logged in" date that's compared with the current date
  // to check if a timestamp is valid (which creates weird behavior when
  // reopening the page) but it's functionalish.
  onSubmit() {
    const user = new User(this.myForm.value.username, this.myForm.value.password);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/lists');
        },
        error => console.error(error)
      );
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
}