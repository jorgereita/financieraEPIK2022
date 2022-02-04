import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {

  AvalFGAIva: " ",
  Capital: "",
  Interes: " ",
  Garantia: "",
  SeguroVida: ""

}
@Component({
  selector: 'app-detailpayment',
  templateUrl: './detailpayment.component.html',
  styleUrls: ['./detailpayment.component.scss']
})
export class DetailpaymentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailpaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) { }

  ngOnInit(): void {

    this.data
  }
  closePopUp() {
    this.dialogRef.close();
  }
}
