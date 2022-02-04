import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-olimpia',
  templateUrl: './olimpia.component.html',
  styleUrls: ['./olimpia.component.scss']
})
export class OlimpiaComponent implements OnInit {
  loading: any;
  url: SafeResourceUrl;
  data
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem('oUrl'));
  }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('userData'));
    // setTimeout(async () => {
    //   await this.router.navigateByUrl('/funnel/biometric-success');
    // }, environment.timeToWaitIframes * 1000);
  }

}
