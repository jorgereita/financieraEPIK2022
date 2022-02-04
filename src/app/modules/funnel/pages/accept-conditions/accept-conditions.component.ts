import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-accept-conditions',
  templateUrl: './accept-conditions.component.html',
  styleUrls: ['./accept-conditions.component.scss']
})
export class AcceptConditionsComponent implements OnInit {

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here

    setTimeout(async () => {
      this.loading = false;
      await this.router.navigateByUrl('/funnel/accept-conditions-success');
    }, 1500);

    // this.dataService.newUser(formData).subscribe(async (response: any) => {
    //   if (response.IdError === 0) {
    //     localStorage.setItem('userDataTemp', JSON.stringify(formData));
    //     await this.router.navigateByUrl('/funnel/biometric');
    //     this.loading = false;
    //   } else {
    //     this.openSnackBar(response.Mensaje, 'Cerrar');
    //     this.loading = false;
    //   }
    // });
  }

}
