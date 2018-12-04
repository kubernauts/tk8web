import { Component, OnInit } from '@angular/core';
import { ClusterComponent } from '../cluster/cluster.component';
import { ClusterService } from '../cluster.service';
import { Cluster, Instance, Access, ClusterForm } from '../cluster';

@Component({
  selector: 'app-cluster-create',
  templateUrl: './cluster-create.component.html',
  styleUrls: ['./cluster-create.component.less']
})
export class ClusterCreateComponent extends ClusterComponent  implements OnInit {
  constructor(clusterService: ClusterService) {
    super(clusterService);
  }
  get diagnostic() { return  [JSON.stringify(this.model), JSON.stringify(this.networkSetting)] ; }
  form = new ClusterForm(false);
  networkSetting = false;
  model = new Cluster(
    '',
    'default',
    'default',
    'default',
    'default',
    new Instance(2, 'default'),
    new Instance(3, 'default'),
    new Instance(2, 'default'),
    new Access('', ''),
  );
  submitted = false;

  awsInstanceTypes = [
    't3.medium',
    't3.large',
    't3.xlarge',
    't3.3xlarge',
    'm4.large',
    'm4.xlarge',
    'm4.2xlarge',
    'm4.4xlarge',
    'm4.10xlarge',
    'm4.16xlarge',
    'c4.large',
    'c4.xlarge',
    'c4.2xlarge',
    'c4.4xlarge',
    'c4.8xlarge',
    'd2.xlarge',
    'd2.2xlarge',
    'd2.4xlarge',
    'd2.8xlarge',
  ];
  ngOnInit() {
  }
  onSubmit() { this.submitted = true;
    // send config to tk8
    this.clusterService.createCluster(this.model);
  }

}
