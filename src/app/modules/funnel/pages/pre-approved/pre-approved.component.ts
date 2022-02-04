import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { availableAmount } from 'src/app/utils/utils';

@Component({
  selector: 'app-pre-approved',
  templateUrl: './pre-approved.component.html',
  styleUrls: ['./pre-approved.component.scss']
})
export class PreApprovedComponent implements OnInit {

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataService: DataService,
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

  async finishFlow(): Promise<void> {
    await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El usuario rechazó la solicitud' }, state: { data: { isOk: false, } } });
  }

  async continue(): Promise<void> {
    await this.router.navigateByUrl('/funnel/add-accounts');
  }

}
