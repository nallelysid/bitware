import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { stats } from '../models/stats';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
 

  private _statsSubject = new BehaviorSubject<stats[]>([]);
  private _stats$ = this._statsSubject.asObservable();


  private _skillsSubject = new BehaviorSubject<any[]>([]);
  private _skills$ = this._skillsSubject.asObservable();

  constructor() { 
    
  }
  get statsList(): stats[]{
    return this._statsSubject.value;
  }
  get statsList$(): Observable<stats[]>{
    return this._stats$;
  }

  get skillsList(): stats[]{
    return this._skillsSubject.value;
  }
  get skillsList$(): Observable<stats[]>{
    return this._skills$;
  }
  setStats(i : any[]){
    return this._statsSubject.next(i);
  }
  setSkills(i : any[]){
    return this._skillsSubject.next(i);
  }
}
