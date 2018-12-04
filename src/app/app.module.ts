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

@NgModule({
  declarations: [
    AppComponent,
    ClusterComponent,
    ClusterDashComponent,
    ClusterDetailComponent,
    ClusterCreateComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
