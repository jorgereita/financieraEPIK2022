import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sincupoparacomprar',
  templateUrl: './sincupoparacomprar.component.html',
  styleUrls: ['./sincupoparacomprar.component.scss']
})
export class SincupoparacomprarComponent implements OnInit {
  public nombre : string;
  public fecha :string;
  constructor() { 

    this.nombre = localStorage.getItem('sincupoNombre');
    this.fecha = localStorage.getItem('sincupoFecha');

  }


  
  ngOnInit(): void {
  }

}
