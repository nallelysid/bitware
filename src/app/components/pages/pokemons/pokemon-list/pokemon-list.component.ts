import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { PokemonCard } from '@app/shared/models/pokemon.card';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { PockemonCardComponent } from '../pockemon-card/pockemon-card.component';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize, filter, map, distinctUntilChanged } from 'rxjs/operators';
import { PokemonDetailModel } from '@app/shared/models/pokemon-detail';
import { DetailService } from '@app/shared/services/detail.service';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, AfterViewInit {
  gridColumns = 4; 
  page = 0;
  size = 20;
  data : PokemonCard[] = [];
  data2 : any[] = [];
  total : number = 0;
  next: string = '';
  previous: string = '';
  filter : string = '';
  detalle! : PokemonDetailModel;
 
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  constructor( 
    private _pokemonService: PokemonService,
    private _detailService : DetailService,
    public dialog: MatDialog,
    ) {  }

  ngOnInit(): void {
    let filters = '';
    let pageSize = 10;
    this._pokemonService.list(this.filter);
   
    this._pokemonService.pockemonList$
    .pipe(      
      tap(r => this.data = r)
    ).subscribe(() => {      
      this.getPokemons(this.data)      
    });  
    
    this._pokemonService.total$.subscribe(total => this.total = total);
    this._pokemonService.next$.subscribe(next => this.next = next);
    this._pokemonService.previous$.subscribe(previous => this.previous = previous);
  
  }

  updateListFriend() {
    this._pokemonService.pockemonList$.subscribe((res: any) => {
      console.log(res);
      this.data = res;
    });
  }
  ngAfterViewInit(){
    //CHANGE PAGE
    this.paginator.page
      .pipe(filter((event: PageEvent) => event.previousPageIndex !== event.pageIndex),
        map((event: PageEvent) => event.pageIndex - event.previousPageIndex!))
      .subscribe((number) => number > 0 ? this.move("next") : this.move("previous"));
    
    
  }

  private move(tipo:string){
    if(tipo === 'next'){
      this._pokemonService.move(this.next);
    }else{
      this._pokemonService.move(this.previous);
    }
    
  }

  getPokemons(data : PokemonCard[]) {
    let pokemonData;
    this.data2 = [];
    data.forEach(element => {
      this._pokemonService.getPokemon(element.url).subscribe(
        (res:any) => {
          pokemonData = {
            id: res.id,
            image: res.sprites.front_default,
            name: res.name,

          };          
          this.data2.push(pokemonData);         
        },
        err => {
          console.log(err);
        }
      );
    });   
  }

  onSearch(id: number){
    let pokemonData : PokemonDetailModel;
    if( id > 0){     
      this._pokemonService.getDetails(id.toString())
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
     
      
    }
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

