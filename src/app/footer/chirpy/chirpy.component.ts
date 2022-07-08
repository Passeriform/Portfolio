import type { OnInit } from "@angular/core";
import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from "@angular/core";

import { Position } from "@shared/models/cardinals.interface";

// TODO: Use existing tooltip component and remove usage of Renderer2.

@Component({
	selector: "app-chirpy",
	styleUrls: [ "./chirpy.component.scss" ],
	templateUrl: "./chirpy.component.html",
})
export class ChirpyComponent implements OnInit {
	@Input() public say: readonly string[];

	public Position = Position;
	public currentMessage: string;

	@HostListener("mouseover")
	public onMouseover(): void {
		this.sayMessage();
	}

	constructor(private readonly renderer: Renderer2) { }

	ngOnInit() {
		// ngOnInit
	}

	public sayMessage(): void {
		const messageIndex = Math.floor(Math.random() * this.say.length);
		this.currentMessage = this.say[messageIndex];
	}
}
