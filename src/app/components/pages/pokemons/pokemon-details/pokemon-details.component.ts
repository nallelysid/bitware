import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PokemonDetailModel } from '@app/shared/models/pokemon-detail';
import { stats } from '@app/shared/models/stats';
import { skills } from '@app/shared/models/skills';
import { DetailService } from '@app/shared/services/detail.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  tipos: string[] = []; 
  statistics : stats[] = [];
  abilitys: skills[] = []; 
  
  constructor( public dialogRef: MatDialogRef<PokemonDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonDetailModel,
    private _detailService : DetailService) { 
      console.log('dataDetalle', data);
      data.types.forEach( (type) => {
        console.log(type.type.name);
        let tipo = type.type.name;
        this.tipos.push(tipo);
      });

      this.getStats();
    
      this.getSkills();

    }
  

  ngOnInit(): void {
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  private getStats(){
    this._detailService.statsList$
    .pipe(
      map ( (r)  => {
        let resultArray: any = [];
          r.forEach( (item: any) => {
         
            let stadistica = {
              base_stat: item.base_stat,                
              name: item.stat.name               
            }; 
            //Guardarlo en un arreglo
            resultArray.push(stadistica);
          });
          return resultArray
        })
    )      
    .subscribe(res=>{
      
      this.statistics = res;
      
    })
  }

  private getSkills(){
    this._detailService.skillsList$
    .pipe(
      map ( (r)  => {
        let resultArray: any = [];
          r.forEach( (item: any) => {
            console.log('y', item.ability.name);            
            let stadistica = {                     
              name: item.ability.name               
            }; 
            //Guardarlo en un arreglo
            resultArray.push(stadistica);
          });
          return resultArray
        })
    )      
    .subscribe(res=>{      
      this.abilitys = res;
      console.log('sueño', this.abilitys);
    })
  }

}
