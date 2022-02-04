import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-bank-note',
  templateUrl: './bank-note.component.html',
  styleUrls: ['./bank-note.component.scss']
})
export class BankNoteComponent implements OnInit {

  loading: any;
  hasBankNote: boolean;
  url = localStorage.getItem('oUrl');

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    // setTimeout(async () => {
    //   this.hasBankNote = true;
    // }, environment.timeToWaitIframes * 1000);
  }

  async sendData(): Promise<void> {
    await this.router.navigateByUrl('/funnel/finish');
    // await this.router.navigate(['/funnel/finish-flow'], { queryParams: { message: 'El proceso ha sido finalizado con éxito' }, state: { data: { isOk: true, } } });
  }
}
