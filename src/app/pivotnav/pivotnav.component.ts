import { Component, Input, EventEmitter, ElementRef, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { SineWaves } from 'sine-waves'
import { PItemComponent } from './pitem.component';

declare  var SineWaves:  any;

@Component({
  selector: 'pivotnav',
  templateUrl: './pivotnav.component.html',
  styleUrls: ['./pivotnav.component.sass']
})
export class PivotnavComponent {

  @Input() srclogo: string;
  @Input() placeholder: string;

  constructor() { }

  ngAfterViewInit() {
    var width = 300;
    var height = 300;
    var amplitude = 30;
    var speed = -4;
    var ease = 'SineInOut';

    var waves = [
      {
        timeModifer: 1,
        lineWidth: 1,
        amplitude: amplitude/3,
        wavelength: 23
      },
      {
        timeModifer: 1,
        lineWidth: 1,
        amplitude: amplitude/2,
        wavelength: -79
      },
      {
        timeModifer: 1,
        lineWidth: 1,
        amplitude: -amplitude,
        wavelength: 57
      }
      // {
      //   timeModifer: 1,
      //   lineWidth: 1,
      //   amplitude: amplitude,
      //   wavelength: 200,
      //   segmentLength: 1,
      //   type: 'Sine',
      // }
    ];

    var resize = function() {
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0,"rgba(0, 128, 255, 0.5)");
      gradient.addColorStop(0.5,"rgba(255, 255, 255, 0.5)");
      gradient.addColorStop(1,"rgba(0, 128, 255, 0.5)");

      var index = -1;
      var length = this.waves.length;
        while(++index < length){
        this.waves[index].strokeStyle = gradient;
      }

      // Clean Up
      index = void 0;
      length = void 0;
      gradient = void 0;
    }

    new SineWaves({
      el: document.getElementById('waves'),

      speed: speed,
      width: width,
      height: height,
      ease: ease,
      waves: waves,
      rotate: 0,
      resizeEvent: resize
    });

  }

  addClass(event) {
    document.getElementById('circular-menu').classList.add('hover');
    this.addHoverClassToChild();
  }

  removeClass() {
    document.getElementById('circular-menu').classList.remove('hover');
    this.removeHoverClassFromChild();
  }

  addHoverClassToChild() {
    let collection: any = document.getElementsByClassName("menu-item");
    for(let index = 0; index < collection.length; index++) {
      let chClass = 'ch-child-'+(index+1)+'-by-'+collection.length;
      collection[index].classList.add('parent-hovered');
      collection[index].classList.add(chClass);
    }
  }

  removeHoverClassFromChild() {
    let collection: any = document.getElementsByClassName("menu-item");
    for(let index = 0; index < collection.length; index++) {
      let chClass = 'ch-child-'+(index+1)+'-by-'+collection.length;
      collection[index].classList.remove('parent-hovered');
      collection[index].classList.remove(chClass);
    }
  }
}
