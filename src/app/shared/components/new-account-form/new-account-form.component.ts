import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.scss']
})
export class NewAccountFormComponent implements OnInit {

  loading = false;
  selected: string;
  addAccountForm: FormGroup;
  banks = [
    {
      Id: 1,
      Descripcion: 'Bancolombia',
    },
    {
      Id: 2,
      Descripcion: 'GNB Sudameris',
    },
    {
      Id: 3,
      Descripcion: 'Davivienda',
    },
    {
      Id: 4,
      Descripcion: 'Banco Popular',
    },
    {
      Id: 5,
      Descripcion: 'AV Villas',
    },
    {
      Id: 6,
      Descripcion: 'Itaú',
    }
  ];
  accounts = [
    {
      Id: 1,
      Descripcion: 'Cuenta de ahorros',
    },
    {
      Id: 2,
      Descripcion: 'Cuenta corriente',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.addAccountForm = this.formBuilder.group({
      IdBanco: ['1', [Validators.required]],
      IdTipoCuenta: ['1', [Validators.required]],
      NumeroCuenta: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  async sendData(): Promise<void> {
    this.loading = true;
    // Do stuff here
    const formData = {
      ...this.addAccountForm.value,
    };

    console.log(formData);

    setTimeout(async () => {
      this.loading = false;
      // await this.router.navigateByUrl('/funnel/discounted-accounts');
      await this.router.navigateByUrl('/funnel/simulation');
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
