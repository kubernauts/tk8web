import { NodeService } from './../node.service';
import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClusterService } from '../cluster.service';
import { ClusterComponent } from '../cluster/cluster.component';
@NgModule({
  exports: [
    ClusterDashComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
@Component({
  selector: 'app-cluster-dash',
  templateUrl: './cluster-dash.component.html',
  styleUrls: ['./cluster-dash.component.less']
})
export class ClusterDashComponent extends ClusterComponent  implements OnInit {

  constructor(nodeService: NodeService, clusterService: ClusterService) {
    super(nodeService, clusterService);
  }
  ngOnInit() {
  }
}
