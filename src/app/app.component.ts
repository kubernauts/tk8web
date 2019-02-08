import { Component } from '@angular/core';
import { ClusterService } from './cluster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'tk8web';
  constructor(clusterService: ClusterService) {

  }
}
