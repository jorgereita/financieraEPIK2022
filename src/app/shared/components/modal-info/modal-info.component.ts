import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface DialogData {
  data: any;
  title: any;
}
@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})

export class ModalInfoComponent implements OnInit {
  descripcion
  constructor(
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _snackBar: MatSnackBar, public dialogo: MatDialog) {
  }

  ngOnInit(): void {
  }
  sendOk(): void {
    this.dialogRef.close(true);
  }
  sendCancel(): void {
    this.dialogRef.close(false);
  }
}
