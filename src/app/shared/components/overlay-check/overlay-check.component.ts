import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-check',
  templateUrl: './overlay-check.component.html',
  styleUrls: ['./overlay-check.component.scss']
})
export class OverlayCheckComponent implements OnInit {
  @Input() title: any;
  @Input() error: boolean;
  @Input() image: string;

  constructor() { }

  ngOnInit(): void {
  }

}
