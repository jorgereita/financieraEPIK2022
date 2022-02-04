import { Component, OnInit } from '@angular/core';
import { cleanData } from 'src/app/utils/utils';

@Component({
  selector: 'app-init-agent',
  templateUrl: './init-agent.component.html',
  styleUrls: ['./init-agent.component.scss']
})
export class InitAgentComponent implements OnInit {
  loading: any;

  constructor() { }

  ngOnInit(): void {
    cleanData();
  }

}
