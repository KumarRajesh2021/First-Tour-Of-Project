import { Injectable, ɵConsole } from '@angular/core';
import {Observable,of} from 'rxjs';
import {Villain} from './villain';
import {VILLAINS} from './mock-villains';
import{MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VillainService {
 private villainsUrl='api/villains';
//-----------------------------------------
 constructor(private messageService:MessageService,
              private http:HttpClient){ }
//-----------------------------------------
  private log(message:string){
    this.messageService.add(`VillainService:${message}`);
  }
///////////////////////////////////////////////
  getVillains():Observable<Villain[]>{
  return this.http.get<Villain[]>(this.villainsUrl)
        .pipe(
          tap(_ => this.log('fetched villains')),
         catchError(this.handleError<Villain[]>('getVillains',[]))
          );
  }
//-----------------------------------------------
  private handleError<T>(operation='operation',result?:T)
  {
    return (error:any): Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed:${error.message}`);
      return of(result as T);
    }; 
   }
   //--------------------------------------
   getVillainNo404<Data>(id:number):Observable<Villain>
   {
     const url = `${this.villainsUrl}/?id=${id}`;
     return this.http.get<Villain[]>(url)
     .pipe(
       map(villains => villains[0]),
       tap(h => {
         const outcome = h ? `fetched` :`did not find`;
         this.log(`${outcome} villain id=${id}`);
       }),
         catchError(this.handleError<Villain>
         (`getVillain id=${id}`))
       );
   }
//----------------------------------------------
  getVillain(id:number):Observable<Villain>{
    const url= `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>
      (url).pipe(
      tap(_ => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>
        (`getVillain id=${id}`))
    );
  }
  // this.messageService
    // .add(`VillainService:fetched villain id=${id}`);
    // return of(VILLAINS.find(villain => villain.id===id));
  //----------------------------------------------
  updateVillain(villain:Villain):Observable<any>{
    return this.http.put(this.villainsUrl,villain,this.httpOptions).pipe(
      tap(_ => this.log(`updated villain id=${villain.id}`),
      catchError(this.handleError<any>('updateVillain')))
    );
  }
  //------------------------------------------
  httpOptions={
    headers:new HttpHeaders({'Content-Type': 'application/json'})
  };
  //-------------------------------------
  addVillain(villain:Villain):Observable<Villain>{
    return this.http.post<Villain>
    (this.villainsUrl,villain,this.httpOptions).pipe(
      tap((newVillain:Villain) =>
      this.log(`added villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))
    );
  }
  //----------------------------------------------
  deleteVillain(villain:Villain | number):Observable<Villain>{
    const id= typeof villain === 'number'? villain:villain.id;
     const url = `${this.villainsUrl}/${id}`;
     return this.http.delete<Villain>
     (url,this.httpOptions).pipe(
       tap(_ => this.log(`deleted villain id=${id}`)),
       catchError(this.handleError<Villain>('deleteVillain'))
     );
  }
  //-------------------------------------------------
  searchVillains(term: string): Observable<Villain[]> {
    if (!term.trim()) {
      // if not search term, return empty villain array.
      return of([]);
    }
    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found villain matching "${term}"`)),
      catchError(this.handleError<Villain[]>('searchVillains', []))
    );
  }
  // getVillains():Observable<Villain[]>{
    //   this.messageService
    //       .add('VillainService:fetched villains');
    //   return of(VILLAINS);
    // }
}
