import { Component, Input, OnInit, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
	selector: 'app-chirpy',
	templateUrl: './chirpy.component.html',
	styleUrls: ['./chirpy.component.sass'],
})
export class ChirpyComponent implements OnInit {
	@Input() say: string[];

	@ViewChild('sayTarget', { static: false }) sayTarget;

	@HostListener('mouseover')
	onMouseover() {
		this.sayMessage();
	}

	@HostListener('mouseout')
	onMouseout() {
		this.destroyMessage();
	}

	constructor(private renderer: Renderer2) { }

	ngOnInit() { }

	shuffleSay() {
		this.say = this.say
			.map((message) => ({ msg: message, val: Math.random() }))
			.sort((a, b) => a.val - b.val)
			.map((msgObj) => msgObj.msg);
	}

	sayMessage() {
		this.shuffleSay();

		const sayText = this.renderer.createText(this.say[0]);
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, 'innerHTML', this.say[0]);
		this.renderer.addClass(this.sayTarget.nativeElement, 'show');
	}

	destroyMessage() {
		this.renderer.removeClass(this.sayTarget.nativeElement, 'show');
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, 'innerHTML', '');
	}
}
