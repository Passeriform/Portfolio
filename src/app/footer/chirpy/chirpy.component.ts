import type { OnInit } from "@angular/core";
import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from "@angular/core";

@Component({
	selector: "app-chirpy",
	styleUrls: [ "./chirpy.component.scss" ],
	templateUrl: "./chirpy.component.html",
})
export class ChirpyComponent implements OnInit {
	@Input() public say: readonly string[];

	@ViewChild("sayTarget", { read: ElementRef }) public readonly sayTarget: ElementRef<HTMLElement>;

	@HostListener("mouseover")
	public onMouseover(): void {
		this.sayMessage();
	}

	@HostListener("mouseout")
	public onMouseout(): void {
		this.destroyMessage();
	}

	constructor(private readonly renderer: Renderer2) { }

	ngOnInit() {
		// ngOnInit
	}

	public sayMessage(): void {
		const messageIndex = Math.floor(Math.random() * this.say.length);
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", this.say[messageIndex]);
		this.renderer.addClass(this.sayTarget.nativeElement, "show");
	}

	public destroyMessage(): void {
		this.renderer.removeClass(this.sayTarget.nativeElement, "show");
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", "");
	}
}
