import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sincredito-compensar',
  templateUrl: './sincredito-compensar.component.html',
  styleUrls: ['./sincredito-compensar.component.scss']
})
export class SincreditoCompensarComponent implements OnInit {
  data
  constructor() {
    this.data = JSON.parse(localStorage.getItem('userData'));
   }

  ngOnInit(): void {
  }

}
