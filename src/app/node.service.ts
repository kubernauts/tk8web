import { Clusternode } from './clusternode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as nodeInfo from '../assets/node.json';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  nodes = [];

  constructor(private httpClient: HttpClient) { }

  getNodes() {
    nodeInfo.default.items.forEach( ni => {
      console.log(ni);
      const node = new Clusternode(ni.metadata.name,ni.kind);
      node.isMaster=ni.metadata.labels['node-role.kubernetes.io/controlplane'];
      node.isWorker=ni.metadata.labels['node-role.kubernetes.io/worker'];
      node.isEtcd=ni.metadata.labels['node-role.kubernetes.io/etcd'];
      node.Architecture = ni.status.nodeInfo.architecture;
      node.ContainerRuntime = ni.status.nodeInfo.containerRuntimeVersion;
      node.KubeVersion = ni.status.nodeInfo.kubeletVersion;
      node.OS = ni.status.nodeInfo.osImage;
      node.IpAddress = ni.status.addresses;
      this.nodes[node.Name] = node;
    });

    console.log(this.nodes);
    return this.nodes;
  }
}
