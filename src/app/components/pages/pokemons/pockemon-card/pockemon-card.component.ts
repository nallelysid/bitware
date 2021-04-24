import { Component, Input, OnInit } from '@angular/core';

import { PokemonDetailModel } from '@app/shared/models/pokemon-detail';

@Component({
  selector: 'app-pockemon-card',
  templateUrl: './pockemon-card.component.html',
  styleUrls: ['./pockemon-card.component.css']
})
export class PockemonCardComponent implements OnInit {
  @Input('dataPockemon') dataPockemon! : PokemonDetailModel;
  
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
