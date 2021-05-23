import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VillainsComponent} from './villains/villains.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {VillainDetailComponent} from './villain-detail/villain-detail.component';


const routes: Routes = [
  {path:'villains',component: VillainsComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'detail/:id',component: VillainDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
