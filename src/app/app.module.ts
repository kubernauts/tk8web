import { ClusterService } from './cluster.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClusterComponent } from './cluster/cluster.component';
import { ClusterDashComponent } from './cluster-dash/cluster-dash.component';
import { ClusterDetailComponent } from './cluster-detail/cluster-detail.component';
import { ClusterCreateComponent } from './cluster-create/cluster-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VersionComponent } from './version/version.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SomethingComponent } from './something/something.component';

@NgModule({
  declarations: [
    AppComponent,
    ClusterComponent,
    ClusterDashComponent,
    ClusterDetailComponent,
    ClusterCreateComponent,
    DashboardComponent,
    VersionComponent,
    SomethingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  exports: [],
  providers: [
    ClusterService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
