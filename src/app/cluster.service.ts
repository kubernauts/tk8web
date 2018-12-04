import { Injectable } from '@angular/core';
import { Cluster, Instance, Access } from './cluster';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private httpClient: HttpClient) { }

  getClusters(): Cluster[] {
    const clusters = [];
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(element => {
      const cluster = new Cluster(
        'name',
        'ubuntu',
        'aws',
        'tk8',
        'eu-west-1',
        new Instance(1, 'default'),
        new Instance(1, 'default'),
        new Instance(0, 'default'),
        new Access('', ''),
      );
      cluster.name = 'k8s-test-' + element;
      cluster.provisioner = 'aws';
      cluster.installer = 'tk8';
      cluster.keyPairName = 'manuel';
      cluster.generateKeyPair = false;
      clusters.push(cluster);
    });
    return clusters;
  }

  createCluster(cluster: Cluster) {
    return this.httpClient.post('http://localhost:3000/cluster', cluster).subscribe(res => {
      console.log(res);
    });
  }


  deleteCluster(): void {}

  scaleCluster(): void {}

  resetCluster(): void {}

}
