import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';

@Component({
  selector: 'app-uidvalidation',
  templateUrl: './uidvalidation.component.html',
  styleUrls: ['./uidvalidation.component.scss']
})
export class UidvalidationComponent implements OnInit {
  loading = false;
  dataResponse
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogReasons: MatDialog,
    private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    this.getUidValidation();
  }
  closeTab(){
    window.open('','_self').close();
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

      }
    });
  }
  getUidValidation() {
    this.loading = true;
    this.dataService.validateUidToken({
      "Validador": this.route.snapshot.paramMap.get("uid")
  }).subscribe(async (response: any) => {
        this.loading = false;
        if (response.IdError === 0) {
          this.dataResponse = response
        } else {
          this.irPopUpInfo(response.Mensaje);
        }
      });
  }
}
