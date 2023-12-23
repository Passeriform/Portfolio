import type { ElementRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { CanvasService } from "./canvas.service";

// TODO: Move to utility.
type SpyPropertyDescriptor<T> = {
	get: () => T;
	set: jasmine.Spy<(_: T) => void>;
};

describe("CanvasService", () => {
	let service: Readonly<CanvasService>;
	let contextSpy: jasmine.SpyObj<Readonly<CanvasRenderingContext2D>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ CanvasService ],
		});
		service = TestBed.inject(CanvasService);
		contextSpy = jasmine.createSpyObj<CanvasRenderingContext2D>("Context", [
			"beginPath",
			"arc",
			"fill",
		], { fillStyle: "black" });
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should draw a dot", () => {
		const drawProperties = {
			color: "red",
			radius: 2,
			xPos: 25,
			yPos: 30,
		};

		service.setCanvasElement({ nativeElement: { getContext: (_: string) => contextSpy } } as unknown as ElementRef<HTMLCanvasElement>);
		service.refreshContext();
		service.drawDot(drawProperties);

		const fillStyleSpy = (Object.getOwnPropertyDescriptor(
			contextSpy,
			"fillStyle",
		) as SpyPropertyDescriptor<string>).set;

		expect(contextSpy.beginPath).toHaveBeenCalledOnceWith();
		expect(contextSpy.arc).toHaveBeenCalledOnceWith(
			drawProperties.xPos,
			drawProperties.yPos,
			drawProperties.radius,
			0,
			Math.PI * 2,
			true,
		);
		expect(fillStyleSpy).toHaveBeenCalledOnceWith(drawProperties.color);
		expect<() => void>(contextSpy.fill).toHaveBeenCalledOnceWith();
	});
});
