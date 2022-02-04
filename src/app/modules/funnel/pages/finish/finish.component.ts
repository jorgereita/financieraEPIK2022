import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cleanData } from 'src/app/utils/utils';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async finishFlow(): Promise<void> {
    cleanData();
    await this.router.navigateByUrl('/agent-home');
  }
}
