import { Component, OnInit } from '@angular/core';
import {Villain} from '../villain';
import {VillainService} from '../villain.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
villains:Villain[] = [];
  constructor(private villainService:VillainService) { }

  ngOnInit() {
    this.getVillains();
  }
  getVillains():void{
    this.villainService.getVillains()
        .subscribe(villains => this.villains = villains.slice(1,5));
  }
}
