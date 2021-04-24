import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { PokemonCard } from '@shared/models/pokemon.card'
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonDetailModel } from '../models/pokemon-detail';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  baseUrl : string = environment.baseURLAPI;

  private _loadingSubject = new BehaviorSubject<boolean>(false);
  
  private _totalSubject = new BehaviorSubject<any>({});
  private _total$ = this._totalSubject.asObservable();

  private _pockemonListSubject = new BehaviorSubject<PokemonCard[]>([]);
  private _pockemonListSubject$ = this._pockemonListSubject.asObservable();

  private _nextSubject = new BehaviorSubject<any>({});
  private _next$ = this._nextSubject.asObservable();

  private _previousSubject = new BehaviorSubject<any>({});
  private _previous$ = this._previousSubject.asObservable();

  private _pockemonDetailSubject = new BehaviorSubject<PokemonDetailModel[]>([]);
  private _pockemonDetailSubject$ = this._pockemonDetailSubject.asObservable();

  // private _filterSubject = new BehaviorSubject<string>('');
  // private _filterSubject$ = this._filterSubject.asObservable();



  constructor(private http: HttpClient) { }

  get pockemonList() : PokemonCard[]{
    return this._pockemonListSubject.value;
  }
  get pockemonList$() : Observable<PokemonCard[]>{
    return this._pockemonListSubject$
  }

  get total$(){
    return this._total$;
  }
  get next$(){
    return this._next$;
  }
  get previous$(){
    return this._previous$;
  }

  // get filter() : string{
  //   return this._filterSubject.value;
  // }
  // get filter$() : Observable<string>{
  //   return this._filterSubject$
  // }

  list( query = '', page = 1): void{
    let url: string = `${this.baseUrl}/pokemon/${query}`;
     this.http.get<PokemonCard[]>(url).subscribe((res:any)=>{
      this.updateSubjects(res);
    });

  }

  move(url : string) : void {    
     this.http.get<PokemonCard[]>(url).subscribe((res:any)=>{
      this.updateSubjects(res);
    });
    //return new Observable<any>();
  }
  getPokemon(url : string) : Observable<any> {    
    return this.http.get<PokemonDetailModel>(url)
  }


  getDetails(id : string) : Observable<any>  {
    let url: string = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<PokemonCard[]>(url);
    //  this.http.get<PokemonCard[]>(url).subscribe((res:any)=>{
    //   this._pockemonDetailSubject.next(res);
    // });
  }
  // setFilter(f : string){
  //   return this._filterSubject.next(f);
  // }
  private updateSubjects(res:any){
    this._pockemonListSubject.next(res.results);
    this._totalSubject.next(res.count);
    this._nextSubject.next(res.next);
    this._previousSubject.next(res.previous);
  }
}
