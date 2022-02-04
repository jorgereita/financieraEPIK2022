import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataService} from '../../../../services/data.service';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-amount-success',
  templateUrl: './choose-amount-success.component.html',
  styleUrls: ['./choose-amount-success.component.scss']
})
export class ChooseAmountSuccessComponent implements OnInit {
  private loading: boolean;
  data: any;
  hasWappDone: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dataService: DataService,
  ) {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    // setTimeout(() => this.hasWappDone = true, environment.timeToWaitIframes * 1000);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  async sendBankNote(): Promise<void> {
    this.loading = true;

    const formData = {
      ApiKey: 'Ep1kColombia2021*',
      NumeroIdentificacion: localStorage.getItem('NumeroIdentificacion'),
      Celular: this.data?.Celular,
      Email: this.data?.Email,
      Nombre: this.data?.PrimerNombre,
      Apellido: this.data?.PrimerApellido,
    };

    this.dataService.getOlimpiaBankNote(formData).subscribe(async (response) => {
      console.log(response);
      if (response.IdError === 0) {
        localStorage.setItem('oUrl', response.Url);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
      }

      this.loading = false;
    });

    await this.router.navigateByUrl('/funnel/bank-note');
  }
}
