import { SomethingComponent } from './something/something.component';
import { VersionComponent } from './version/version.component';
import { ClusterDetailComponent } from './cluster-detail/cluster-detail.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'cluster/create', component: ClusterCreateComponent},
  {path: 'cluster/detail/:cluster', component: ClusterDetailComponent},
  {path: 'contact', redirectTo: 'https://bit.ly/tk8-web-kubernauts'},
  {path: 'version', component: VersionComponent},
  {path: 'something', component: SomethingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
