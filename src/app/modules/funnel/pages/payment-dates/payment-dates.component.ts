import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { DataService } from '../../../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-payment-dates',
  templateUrl: './payment-dates.component.html',
  styleUrls: ['./payment-dates.component.scss']
})

export class PaymentDatesComponent implements OnInit {
  loading = false;
  additionalDataForm: FormGroup;
  dataFromSimulation

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.additionalDataForm = this.formBuilder.group({
      Plazo: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this.dataFromSimulation = JSON.parse(localStorage.getItem("dataSimulacion"));
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getPayDay() {
    let day = this.dataFromSimulation.cotizadorData.CiclosFacturacion.find(key => key.IdCicloFacturacion == this.additionalDataForm.value.Plazo)?.FechaFacturacion;
    return day
  }
  sendData(): void {

    const formData =
    {
      "NumeroIdentificacion": localStorage.getItem('NumeroDocumento'),
      "NumeroAutorizacion": this.dataFromSimulation.cotizadorData.NumeroAutorizacion,
      "IdSimulador": this.dataFromSimulation.selectDate,
      "IdCicloFacturacion": this.additionalDataForm.value.Plazo
    }
    this.loading=true;
    this.dataService.selecCredito(formData).subscribe(async (response: any) => {
      this.loading = true;
      if (response.IdError === 0) {
        localStorage.setItem("userDataResm",JSON.stringify(response));
        this.router.navigateByUrl('/funnel/status');
      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
