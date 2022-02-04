import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {availableAmount, cleanData, getQuote} from 'src/app/utils/utils';
import {Location} from '@angular/common';

@Component({
  selector: 'app-choose-amount',
  templateUrl: './choose-amount.component.html',
  styleUrls: ['./choose-amount.component.scss']
})
export class ChooseAmountComponent implements OnInit {
  amountForm: FormGroup;
  terms: Array<any> = [
    {
      Id: 1,
      Descripcion: '6 meses',
    },
    {
      Id: 2,
      Descripcion: '12 meses',
    },
    {
      Id: 3,
      Descripcion: '18 meses',
    },
    {
      Id: 4,
      Descripcion: '24 meses',
    },
    {
      Id: 5,
      Descripcion: '36 meses',
    },
    {
      Id: 6,
      Descripcion: '48 meses',
    },
    {
      Id: 7,
      Descripcion: '60 meses',
    },
  ];
  loading = false;
  data: any;
  panelOpenState = false;
  seePlan = false;
  quotes: Array<any>;
  payout: any;
  income: any;
  availableAmount;
  requestedMoney = parseInt(localStorage.getItem('requestMoney') || '0', 10);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private location: Location,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.payout = this.route.snapshot.queryParams.payout || null;
    this.income = this.route.snapshot.queryParams.income || null;
    this.availableAmount = this.data.MontoAprobado || availableAmount;

    this.amountForm = this.formBuilder.group({
      Monto: [1000000, [Validators.required, Validators.min(400000), Validators.max(this.availableAmount)]],
      // Plazo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendData(): Promise<void> {
    // Do stuff here
    this.loading = true;
    const formData = this.amountForm.value;
    console.log(formData);
    setTimeout(async () => {
      this.loading = false;
      // await this.router.navigateByUrl('/funnel/add-accounts');
      await this.router.navigateByUrl('/funnel/bank-note');
    }, 2000);
  }

  resolveLoan(): any {
    return getQuote(this.amountForm.value.Monto, 12) * 12;
  }

  calculateQuotes(): any {
    return [
      {NumeroCuotas: 6, ValorCuota: getQuote(this.requestedMoney, 6)},
      {NumeroCuotas: 12, ValorCuota: getQuote(this.requestedMoney, 12)},
      {NumeroCuotas: 18, ValorCuota: getQuote(this.requestedMoney, 18)},
      {NumeroCuotas: 24, ValorCuota: getQuote(this.requestedMoney, 24)},
      {NumeroCuotas: 36, ValorCuota: getQuote(this.requestedMoney, 36)},
      {NumeroCuotas: 48, ValorCuota: getQuote(this.requestedMoney, 48)},
    ];
  }

  async sendViaWapp(): Promise<void> {
    this.loading = true;

    const formData = {
      ApiKey: 'Ep1kColombia2021*',
      Celular: this.data?.Celular,
    };

    this.dataService.sendQuoteViaWapp(formData).subscribe(async (response) => {
      console.log(response);
      if (response.IdError === 0) {
        await this.router.navigateByUrl('/funnel/choose-amount-success');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }

      this.loading = false;
    });
  }

  reQuote(): void {
    this.location.back();
  }

  async cancel(): Promise<void> {
    cleanData();
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'Proceso finalizado por el cliente' }, state: { data: { isOk: false, } } });
  }
}
