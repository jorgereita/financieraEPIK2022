import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { screens } from 'src/app/utils/screens';



@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
@Injectable()
export class EnrollComponent implements OnInit {
  loading = false
  listaUsuarios
  imageSrc = "assets/img/default-user.png";
  actualItem
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getUsers() {
    this.dataService.listaEnrolar().subscribe(async (response: any) => {
      if (response) {
        this.listaUsuarios = response.map(key => {
          key.imgSelect = false;
          return key
        });

      } else {
        this.openSnackBar(response.Mensaje, 'Cerrar');
        this.loading = false;
      }
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }


  sendImage(item) {
    if ((this.imageSrc !== "assets/img/default-user.png")) {
      this.loading = true;
      // if(this.webcamImage!==null){
      //   this.imageSrc=this.webcamImage.imageAsDataUrl
      // }
      this.dataService.enrolarUsr({
        "Identificacion": item.Identificacion,
        "Nombre": item.PrimerNombre,
        "Foto": this.imageSrc.split(",")[1]
      }).subscribe(data => {
        // this.screenOn=false;
        this.loading = false;
        var x = document.getElementById("snackbar");
        x.innerHTML = data.Mensaje;
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        if (data.IdError == 0) {

        }
        if (data.IdError == -999) {

        }
      });
    } else {
      var x = document.getElementById("snackbar");
      x.innerHTML = "Debe Seleccionar una imagen antes de enrolar";
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }
  }
  sendPhoto(img) {
    this.loading=true
    this.dataService.enrolarUsr({
      "Identificacion": this.actualItem.Identificacion,
      "Nombre": this.actualItem.PrimerNombre,
      "Foto": img
    }).subscribe(data => {
      this.loading=false;

      if (data.IdError == 0) {
        this.getUsers();
      }
      if (data.IdError == -999) {
        this.openSnackBar(data.Mensaje, 'Cerrar');
      }
    });
  }
  openPopUp(item) {
    this.actualItem = item;
    this.dialogo.open(PopUpImgComponent, {
      width: '100vw',
      height: '80vh',

    }).afterClosed()
      .subscribe((data) => {
        if (data) {
          this.sendPhoto(data);
        
        } else {

        }
      });
  }
}

@Component({
  selector: 'app-pop-up-img',
  templateUrl: 'popupimg.html',
  styleUrls: ['./enroll.component.scss']
})
export class PopUpImgComponent implements OnInit {

  imageSrc = ""
  load = false;
  camera = false;
  public webcamImage1: string = null;
  constructor(
     public dialogRef: MatDialogRef<PopUpImgComponent>, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private catalogo: DataService) {

  }
  ngOnInit() {
    // this.cargarDatosLista();

  }
  openCamera() {
    this.camera = true;
  }
  enviar() {
    this.dialogRef.close(this.imageSrc);
  }
  cancelarCamara() {
    this.dialogRef.close(undefined);
  }
  activarLoad() {
    
    document.getElementById("fileInputC1").click();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  handleInputChange1(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
 
  _handleReaderLoaded(e) {
    this.load = true;
    let reader = e.target;
    this.imageSrc = reader.result;
  }

}
