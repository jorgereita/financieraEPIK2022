import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { screens } from 'src/app/utils/screens';

@Component({
  selector: 'app-checkface',
  templateUrl: './checkface.component.html',
  styleUrls: ['./checkface.component.scss']
})
export class CheckfaceComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;
  loading = false;
  screenOn1: boolean;
  public webcamImage1: string = null;
  imageBack = 'assets/images/funnel/take-picture-overlay.png';
  imageSrc1 = 'assets/images/funnel/face-detection.png';
  waitSend = false;
  data

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('userData'));
    this.toggleCamera1();
  }
  cancelCamera() {
    this.router.navigateByUrl("/funnel/initial-query");
  }
  sendFacePhoto() {
    console.log(this.webcamImage1)

  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  toggleCamera1() {
    this.webcamImage1 = null;
    this.screenOn1 = true;
  }

  handleImage1(webcamImage: any) {
    this.webcamImage1 = webcamImage.imageAsDataUrl;
    this.takePhoto();
  }

  async takePhoto(): Promise<void> {
    this.loading = true;

    const formData = {
      "NumeroIdentificacion": this.data.NumeroIdentificacion,
      "NumeroAutorizacion": this.data.NumeroAutorizacion,
      "FotoSelfie": this.webcamImage1
    }
    this.dataService.validarIdentidad(formData).subscribe(async (response: any) => {
      //debugger;
      if (response.IdError === 0) {

        if (response.IdEstado == 2) {
          localStorage.setItem('userData', JSON.stringify(response));
          await this.router.navigateByUrl('simulation');

        } else {
          if (response.IdEstado == 72) {
            localStorage.setItem('sincupoNombre', response.Nombres);
            localStorage.setItem('sincupoFecha', response.Mensaje);
            await this.router.navigateByUrl('sincupoparacomprar');
          }
          else {
            await this.router.navigateByUrl('reject-facecheck');
          }
        }

      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
}
