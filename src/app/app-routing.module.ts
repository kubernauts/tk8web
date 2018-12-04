import { ClusterDetailComponent } from './cluster-detail/cluster-detail.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { post } from 'selenium-webdriver/http';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'cluster/create', component: ClusterCreateComponent},
  {path: 'cluster/detail/:cluster', component: ClusterDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
