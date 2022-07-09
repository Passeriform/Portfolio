import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

@Component({
	selector: "app-chirpy",
	styleUrls: [ "./chirpy.component.scss" ],
	templateUrl: "./chirpy.component.html",
})
export class ChirpyComponent {
	@Input() public say: readonly string[];

	public Position = Position;
	public currentMessage: string;

	@HostListener("mouseover")
	public onMouseover(): void {
		this.sayMessage();
	}

	public sayMessage(): void {
		const messageIndex = Math.floor(Math.random() * this.say.length);
		this.currentMessage = this.say[messageIndex];
	}
}
