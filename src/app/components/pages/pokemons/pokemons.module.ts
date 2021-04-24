import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { PokemonDetailsComponent,PokemonListComponent } from './index'
import { MatPaginatorModule } from '@angular/material/paginator';
import { PockemonCardComponent } from './pockemon-card/pockemon-card.component'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSliderModule } from '@angular/material/slider'
import { MatChipsModule } from '@angular/material/chips'
import { MatDialogModule } from '@angular/material/dialog'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PockemonAuthorComponent } from './pockemon-author/pockemon-author.component'

@NgModule({
  declarations: [
    PokemonDetailsComponent,
    PokemonListComponent,
    PockemonCardComponent,
    PockemonAuthorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    //Material
    MatPaginatorModule,
    MatCardModule,
    MatGridListModule,
    MatSliderModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressBarModule,

    FlexLayoutModule
  ],
  exports: [
    PokemonDetailsComponent,
    PokemonListComponent
  ]
})
export class PokemonsModule { }
