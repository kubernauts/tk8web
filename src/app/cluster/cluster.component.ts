import { ClusterService } from './../cluster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.less']
})
export class ClusterComponent implements OnInit {
  constructor(protected clusterService: ClusterService) { }

  ngOnInit() {
  }

  getCluster(): any {
    return this.clusterService.getClusters();
  }

}
