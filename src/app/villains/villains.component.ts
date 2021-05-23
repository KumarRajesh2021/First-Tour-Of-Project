import { Component, OnInit } from '@angular/core';
import {Villain} from '../villain';
import {VillainService} from "../villain.service";

//import {VILLAINS} from '../mock-villains';//Come with array
//import { HeapProfiler } from 'inspector';
@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {
  villains:Villain[];    //VILLAINS;
  // selectedVillain:Villain;
  constructor(private villainService:VillainService) { }

  ngOnInit() {
    this.getVillains();
  }

//   onSelect(villain:Villain):void{
//          this.selectedVillain=villain;
// }
getVillains():void{
  this.villainService.getVillains()
  .subscribe(villains => this.villains=villains);
}
add(name:string):void{
  name=name.trim();
  if(!name){
    return;
  }
  this.villainService.addVillain({name} as Villain)
      .subscribe(villain =>{
        this.villains.push(villain);
      });
}
delete(villain:Villain):void{
  this.villains=this.villains.filter(h =>h!==villain);
  this.villainService.deleteVillain(villain).subscribe();
}
}
