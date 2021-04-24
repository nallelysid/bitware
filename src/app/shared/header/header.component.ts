import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PockemonAuthorComponent } from '@app/components/pages/pokemons';
import { profile } from '../models/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('languageMenuTrigger') languageMenuTrigger!: MatMenuTrigger;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openMenu() {
    this.languageMenuTrigger.openMenu();
  }
  
  closeMenu() {
    this.languageMenuTrigger.closeMenu();
  }

  showProfile(){
    let perfil: profile = {
      name : 'nalle',
      number : '5551021848',
      resume : '',
      carrera: 'Ingeniero en Sistemas Computacionales'
    };
    
    this.openDialog(perfil);
  }

  
  openDialog( pockemonProfile : profile): void {
    const dialogRef = this.dialog.open(PockemonAuthorComponent, {      
      height: '80%',
      width: '95%',
      data: pockemonProfile
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
