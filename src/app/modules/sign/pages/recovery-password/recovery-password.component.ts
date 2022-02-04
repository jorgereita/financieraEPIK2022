import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent {

  recoverPasswordForm: FormGroup;
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
    this.recoverPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.recoverPasswordForm.controls; }

  login(): void {
    if (this.recoverPasswordForm.invalid) {
      return;
    }

    const formData = this.recoverPasswordForm.value;

    console.log(formData);
  }

  async goHome(): Promise<void> {
    await this.router.navigateByUrl('/');
  }
}
