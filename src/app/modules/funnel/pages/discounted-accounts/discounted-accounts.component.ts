import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-discounted-accounts',
  templateUrl: './discounted-accounts.component.html',
  styleUrls: ['./discounted-accounts.component.scss']
})
export class DiscountedAccountsComponent implements OnInit {

  loading = false;
  selected: string;
  addAccountForm: FormGroup;
  terms = [
    {
      Id: 1,
      Descripcion: 'El día 5 de cada mes',
    },
    {
      Id: 2,
      Descripcion: 'El día 10 de cada mes',
    },
    {
      Id: 3,
      Descripcion: 'El día 15 de cada mes',
    },
    {
      Id: 4,
      Descripcion: 'El día 20 de cada mes',
    },
    {
      Id: 5,
      Descripcion: 'El día 25 de cada mes',
    },
    {
      Id: 6,
      Descripcion: 'El día 30 de cada mes',
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.addAccountForm = this.formBuilder.group({
      Fecha: ['5', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = {
      selected: this.selected,
      ...this.addAccountForm.value,
    };

    console.log(formData);

    setTimeout(async () => {
      this.loading = false;
      // await this.router.navigateByUrl('/funnel/accept-conditions');
      await this.router.navigateByUrl('/funnel/choose-amount?payout=ok&income=ok');
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
