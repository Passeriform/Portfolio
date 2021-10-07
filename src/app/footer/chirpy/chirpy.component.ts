import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from "@angular/core";
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
		interface MessageValue {
			msg: string;
			val: number;
		}

		this.say = this.say
			.map((message: string) => ({
				msg: message,
				val: Math.random(),
			}))
			.sort(
				(first: MessageValue, second: MessageValue) => first.val - second.val,
			)
			.map((messageObject: MessageValue) => messageObject.msg);
	}

	public sayMessage(): void {
		this.shuffleSay();

		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", this.say[0]);
		this.renderer.addClass(this.sayTarget.nativeElement, "show");
	}

	public destroyMessage(): void {
		this.renderer.removeClass(this.sayTarget.nativeElement, "show");
		this.renderer.setProperty(this.sayTarget.nativeElement.firstChild, "innerHTML", "");
	}
}
