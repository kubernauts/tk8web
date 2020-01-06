import { Clusternode } from './clusternode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  nodes = [];

  constructor(private httpClient: HttpClient) { }

  getNodes() {


    console.log(this.nodes);
    return this.nodes;
  }
}
