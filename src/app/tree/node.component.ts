import { Component, Input, Output, AfterContentInit, EventEmitter } from '@angular/core';

interface Node {
  label: string;
  children: Node[];
}

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.sass']
})
export class NodeComponent implements AfterContentInit {

  @Input() model: Node;

  @Input() level?: number;
  @Input() index?: number;

  @Output() changeNode: EventEmitter<any>;

  constructor() {
    this.level = this.level | 0;
    this.index = this.index | 0;

    this.changeNode = new EventEmitter<any>();
  }

  ngAfterContentInit() {
  }

  nodeClick() {
    console.log({"level":this.level, "index":this.index})
    this.changeNode.emit({"level":this.level, "index":this.index});
  }

  alterRoute() {
    console.log({"level":this.level, "index":this.index})
    this.changeNode.emit({"level":this.level, "index":this.index});
  }

}
