import { Component, OnInit } from '@angular/core';
import {Observable,Subject} from 'rxjs';
import {
  debounceTime,distinctUntilChanged,switchMap
} from 'rxjs/operators';
import {Villain} from '../villain';
import {VillainService} from '../villain.service';

@Component({
  selector: 'app-villain-search',
  templateUrl: './villain-search.component.html',
  styleUrls: ['./villain-search.component.css']
})
export class VillainSearchComponent implements OnInit {
  villains$: Observable<Villain[]>;
  private searchTerms =new Subject<string>();

  constructor(private villainService:VillainService) { }
  search(term:string):void{
     this.searchTerms.next(term);
  }

  ngOnInit():void {
    this.villains$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(
        (term:string) =>
      this.villainService.searchVillains(term)),
    );
  }

}
