import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '@app/components/pages/pokemons';
import { map, tap } from 'rxjs/operators';
import { PokemonDetailModel } from '../models/pokemon-detail';
import { DetailService } from '../services/detail.service';

import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {
  @Output('onClose') onClose: EventEmitter<boolean> = new EventEmitter();
  detalle! : PokemonDetailModel;
  constructor(private _pokemonService: PokemonService,
              public dialog: MatDialog,
              private _detailService : DetailService
              ) { }

  ngOnInit(): void {
  }
  onSearch(value: string){
    
    let pokemonData : PokemonDetailModel;
    if( value && value.length > 0){     
      this._pokemonService.getDetails(value)
        .pipe( 
          map( (res) =>{
            let resultArray: any = [];
           
              pokemonData = {
                id: res.id,
                image: res.sprites.front_default,
                name: res.name,
                types: res.types,
                stats: res.stats
              }; 
              this._detailService.setStats(res.stats);
              this._detailService.setSkills(res.abilities)
         
          this.detalle = pokemonData;
        })
        ).subscribe( () =>  this.openDialog(this.detalle));
     
      this.onClose.emit(true);
    }
  }
  search(value: string){

  }
  focusOutFunction(){
    this.onClose.emit(true);
  }

  openDialog( pockemonDetail : PokemonDetailModel): void {
    const dialogRef = this.dialog.open(PokemonDetailsComponent, {      
      height: '80%',
      width: '95%',
      data: pockemonDetail
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
