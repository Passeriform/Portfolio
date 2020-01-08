import { Component, Input, OnInit } from '@angular/core';
import { NodeComponent } from './node.component';
import { ConfigService } from '../config.service';

@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.sass']
})

export class TreeComponent implements OnInit {

  @Input() dataURL: string;

  private nodeRoute = [];
  private currentLevel: number;
  private selectedNode: number;

  private data = { };

  constructor(private cs: ConfigService) {
  }

  ngOnInit() {
    this.cs.getJSON(this.dataURL).subscribe(data => {
      this.data = data;
    });

    this.nodeRoute = [0];
  }

  changeNode(nodeCapture: any) {
    this.currentLevel = nodeCapture.level;
    this.selectedNode = nodeCapture.node;
  }

  alterRoute(routeCommand: any) {
    switch(routeCommand.option) {
      case 'progress': this.nodeRoute.push(routeCommand.node);
      break;

      case 'retreat': this.nodeRoute.pop();
      break;

      case 'switch':
      {
        let previousNode = this.nodeRoute.pop();
        while(previousNode.level>routeCommand.node) previousNode = this.nodeRoute.pop();
        this.nodeRoute.push(routeCommand.node);
        break;
      }
    }
  }
}
