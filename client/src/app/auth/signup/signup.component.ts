import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { User } from "../user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = new User(
      this.myForm.value.username,
      this.myForm.value.password
    );
    this.authService.signup(user)
      .subscribe(
        data => console.log(data),
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