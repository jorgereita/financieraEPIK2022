import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {

  public currentStream: any;
  public videoDimensions: any;

  param1: string;
  param2: string;
  creditNumber
  cupo = 0
  data
  constructor(private route: ActivatedRoute) {
    let id = this.route.snapshot.paramMap.get("state");

    console.log(id);
    this.data = JSON.parse(localStorage.getItem('userData'));
  }
  ngOnInit(): void {
    registerLocaleData(es);
    this.creditNumber = JSON.parse(localStorage.getItem('dataCreditOk')).NumeroAutorizacion;
    this.cupo =JSON.parse(localStorage.getItem('dataCreditOk')).Cupo
  }

}



