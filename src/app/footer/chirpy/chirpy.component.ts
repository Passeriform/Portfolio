import { Component, HostListener, Input, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import type { OnInit } from "@angular/core";

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

	public shuffleSay(): void {
		this.say = this.say
			.map((message: string) => ({
				msg: message,
				val: Math.random(),
			}))
			.sort((first, second) => first.val - second.val)
			.map((messageObject) => messageObject.msg);
	}

	public sayMessage(): void {
		this.shuffleSay();

		const sayText: HTMLElement = this.renderer.createText(this.say[0]);
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", sayText);
		this.renderer.addClass(this.sayTarget.nativeElement, "show");
	}

	public destroyMessage(): void {
		this.renderer.removeClass(this.sayTarget.nativeElement, "show");
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", "");
	}
}
