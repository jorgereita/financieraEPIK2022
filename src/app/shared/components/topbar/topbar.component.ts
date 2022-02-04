import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import IdleTimer from "../../../IdleTimer";
import { screens } from 'src/app/utils/screens';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { ok } from 'assert';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() title: string;
  @Input() hideMenuAtion: boolean;
  @Input() urlToGo = '/';
  @Input() hideLogout: boolean;
  timer
  loading
  bussinessLogo = ""
  bussines = environment.bussinessName
  constructor(
    private location: Location,
    private router: Router,
    public dialogReasons: MatDialog,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.timer = new IdleTimer({
      timeout: 60 * 30, //expired after x secs
      onTimeout: () => {
        localStorage.clear(); // clear all session data
        this.router.navigateByUrl('/');
      }
    });
    this.validateBussiness();
  }
  ngOnDestroy() {
    this.timer?.cleanUp();
  }
  irPopUpInfo(data) {
    // this.index2Relase = index;
    const dialogRef = this.dialogReasons.open(ModalInfoComponent, {
      width: '400px',
      height: '',
      data: { data: data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendPanic()

      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  sendPanic() {
    this.loading = true;
    this.dataService.validatePanicButton({ "IdConsulta": parseInt(localStorage.getItem('IdConsulta'), 10), }).subscribe(async (response: any) => {
      this.loading = false;
      if (response.IdError === 0) {
        const url = screens[response.IdPantalla];
        await this.router.navigateByUrl(url);
      } else {
        this.irPopUpInfo(response.Mensaje);
      }
    });
  }
  getPanic() {
    if (this.validateRoute()) {
      this.irPopUpInfo("¿ Desea confirmar este paso ?")
    }
  }
  validateBussiness() {
    switch (environment.bussinessName) {
      case "EURO":
        this.bussinessLogo = "./assets/images/funnel/euro-logo.jpg"
        break;
      case "BO-CONCEPT":
        this.bussinessLogo = "./assets/images/funnel/bo-logo.png"
        break;
      case "COMPENSAR":
        this.bussinessLogo = "../assets/images/funnel/Logocompensar2.png"
        break;
      case "BIKEHOUSE":
        this.bussinessLogo = "./assets/images/funnel/LogoBikehouse.png"
        break;
      default:
        break;
    }
  }
  validateRoute(): boolean {
    let route = this.router.url;
    let flag = 1;
    for (let item in screens) {
      if (screens[item] == route && (item !== "1") && (item !== "99") && (item !== "98") && (item !== "97")) {
        flag = flag * 0
      } else {
        flag = flag * 1
      }
    }
    if (flag == 0) {
      return true
    }
    return false
  }
  async logout(): Promise<void> {
    localStorage.clear(); // clear all session data
    await this.router.navigateByUrl('/');
  }

}
