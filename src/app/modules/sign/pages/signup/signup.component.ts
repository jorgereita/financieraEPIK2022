import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  submitted = false;
  @Input() type: string;
  hide: boolean;
  dataImg: any;
  error: any;
  mensaje: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private authService: AuthService,
    // private dataService: DataService,
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.signupForm.controls; }

  login(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const formData = this.signupForm.value;

    console.log(formData);
  }

  async goForget(): Promise<void> {
    await this.router.navigateByUrl('/sign/recover');
  }

}
