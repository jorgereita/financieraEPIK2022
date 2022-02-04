import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {screens} from '../../../../utils/screens';
import {DataService} from '../../../../services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
  authorizationForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {
    this.authorizationForm = this.formBuilder.group({
      AceptaCentralesEpik: [false, [Validators.requiredTrue]],
      AceptaCentralesBanco: [false, [Validators.requiredTrue]],
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
    // Do stuff
    this.loading = true;

    const formData = {
      IdConsulta: parseInt(localStorage.getItem('IdConsulta'), 10),
      ...this.authorizationForm.value,
    };

    this.dataService.financialSaveExtraVariables(formData).subscribe(async (response: any) => {
      if (response.IdError === 0) {
        localStorage.setItem('IdConsulta', response.IdConsulta);
        localStorage.setItem('NumeroDocumento', response.NumeroIdentificacion);

        this.loading = false;
        // set IdConsulta
        // const url = screens[response.IdPantalla];
        await this.router.navigateByUrl('/funnel/pre-approved');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
