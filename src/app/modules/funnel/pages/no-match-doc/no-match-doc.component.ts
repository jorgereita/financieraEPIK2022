import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { screens } from 'src/app/utils/screens';

@Component({
  selector: 'app-no-match-doc',
  templateUrl: './no-match-doc.component.html',
  styleUrls: ['./no-match-doc.component.scss']
})
export class NoMatchDocComponent implements OnInit {
  personalInfoForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.personalInfoForm = this.formBuilder.group({
      NumeroIdentificacion: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }

  ngOnInit(): void {
  }
  sendDataDoc() {
    
    let formData = {
      "IdConsulta": localStorage.getItem('IdConsulta'),
      "NumeroIdentificacion": this.personalInfoForm.value.NumeroIdentificacion,
      "AceptaTratamientoDatos": true,
      "AceptaConsultaCentrales": true
    }
    this.loading = true;
    this.dataService.confirmDocFlow(formData).subscribe(async (response: any) => {

      if (response != null && response.IdError === 0) {
        localStorage.setItem('userData', JSON.stringify(response));
        this.router.navigateByUrl(screens[response.IdPantalla]);
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  allowNumbersfilter(event) {
    var k;
    k = event.charCode;

    let lng = this.personalInfoForm.value.NumeroIdentificacion?.toString()
    if (lng?.length > 10 || (this.personalInfoForm.value.NumeroIdentificacion == 0 && k == 48)) {
      return false
    }
    let keychar = String.fromCharCode(k);
    if (keychar == ".") {
      return false
    }
    return (k == 8 || (k >= 48 && k <= 57));
  }
}
