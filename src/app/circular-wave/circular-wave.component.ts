import { Component, Input, AfterContentInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'circular-wave',
  templateUrl: './circular-wave.component.html',
  styleUrls: ['./circular-wave.component.sass']
})
export class CircularWaveComponent implements AfterContentInit {
  @Input() wavesURL: string;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private width: number = 300;
  private height: number = 300;

  private waves: any = [];

  private hovered: boolean = false;
  private frameCount: number = 0;

  draw() {
  		requestAnimationFrame(this.draw.bind(this));
  		this.frameCount++;

  		this.ctx.clearRect(0, 0, this.width, this.height);

  	for (var wave of this.waves) {
  		this.ctx.beginPath();

  		wave.freqCounter+=this.checkMod(wave, 'frequency');

  		for(let theta=0; theta<2*Math.PI; theta+=0.01) {
  			if(this.frameCount%10==0) {
  				let dynCol = this.returnDynamicColors(10, 10, wave.freqCounter/10);
  				this.ctx.strokeStyle = "rgb(" + dynCol.R + "," + dynCol.G + "," + dynCol.B + ")";
  			}

  			var r = this.checkMod(wave, 'radius') +	//Circle equation radius
  					(
  						this.checkMod(wave, 'amplitude') * Math.cos(	//Follow general equation: A.cos(n.theta+phi)
  							wave.oscillation * theta + wave.freqCounter
  						)
  					);
  			var rect = this.returnRectCoords(theta, r);
  			this.ctx.lineTo(this.width/2 + rect.x, this.height/2 + rect.y);
  			this.ctx.moveTo(this.width/2 + rect.x, this.height/2 + rect.y);
  		}
  		this.ctx.stroke();
  	}
  }

  checkMod(ref, caller) {
  	if(this.hovered) return ref[caller] * ref.modFactors[caller];
  	return ref[caller];
  }

  returnDynamicColors(x, y, t) {
  	return {
  		R: Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )),
  		G: Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ),
  		B: Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) )
  	};
  }

  hover(option) {
  	this.hovered = option;
  }

  returnRectCoords(theta, radius) {
  	let x = radius * Math.cos(theta);
  	let y = radius * Math.sin(theta);
  	return({x, y});
  }

  constructor(private cs: ConfigService) {
  }

  ngAfterContentInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById("circular-wave");
    this.ctx = this.canvas.getContext("2d");

    this.cs.getJSON(this.wavesURL).subscribe(waves => {
      this.waves = waves;
    });

    this.ctx.lineWidth = 0.1;

  	this.draw();
  }

}
