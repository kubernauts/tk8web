import { NodeService } from './node.service';
import { Injectable } from '@angular/core';
import { Cluster, Instance, Access } from './cluster';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  clusters=[];

  constructor(private nodeService: NodeService,private httpClient: HttpClient) { }

  getClusters(): Cluster[] {
    this.clusters=[];
    let nodes = this.nodeService.getNodes();
    const cluster = new Cluster(
      'test-cluster',
      'ubuntu',
      'aws',
      'tk8',
      'eu-central-1',
      new Instance('0', 'default'),
      new Instance('0', 'default'),
      new Instance('0', 'default'),
      new Access('', ''),
    );
    cluster.provisioner = 'aws';
    cluster.installer = 'rke';
    cluster.keyPairName = 'manuel';
    cluster.generateKeyPair = false;
    cluster.master.count = '3';
    cluster.node.count = '3';
    cluster.etcd.count = '3';

    nodes.forEach(element => {
      cluster.os = element.OS;
    });

    this.clusters.push(cluster);
    console.log(this.clusters);
    return this.clusters;
  }

  createCluster(cluster: Cluster) {
    return this.httpClient.post('http://localhost:8081/cluster/create', cluster).subscribe(res => {
      console.log(res);
      this.clusters.push(res);
    });
  }


  deleteCluster(): void {}

  scaleCluster(): void {}

  resetCluster(): void {}

}
