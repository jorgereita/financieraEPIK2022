import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biometric-success',
  templateUrl: './biometric-success.component.html',
  styleUrls: ['./biometric-success.component.scss']
})
export class BiometricSuccessComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async next(): Promise<void> {
    if (localStorage.getItem('path') === 'last') {
      await this.router.navigateByUrl('/funnel/agent-home');
      return;
    }
    if (localStorage.getItem('path') === 'other') {
      await this.router.navigateByUrl('/funnel/additional-data');
      return;
    }

    await this.router.navigateByUrl('/funnel/additional-data');
  }
}
