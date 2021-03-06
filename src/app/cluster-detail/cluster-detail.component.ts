import { NodeService } from './../node.service';
import { Component, OnInit } from '@angular/core';
import { ClusterComponent } from '../cluster/cluster.component';
import { ClusterService } from '../cluster.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cluster-detail',
  templateUrl: './cluster-detail.component.html',
  styleUrls: ['./cluster-detail.component.less']
})
export class ClusterDetailComponent extends ClusterComponent  implements OnInit {
  cluster: string;

  constructor(nodeService: NodeService, clusterService: ClusterService, private route: ActivatedRoute) {
    super(nodeService,clusterService);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cluster = params.cluster;
    });
  }

  getNodes(): any {
    return this.nodeService.getNodes();
  }

}
