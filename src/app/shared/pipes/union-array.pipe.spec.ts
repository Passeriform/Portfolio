import { NgForOf } from "@angular/common";
import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";

import { UnionArrayPipe } from "./union-array.pipe";

@Component({
	imports: [
		UnionArrayPipe,
		NgForOf,
	],
	selector: "app-union-array-host",
	standalone: true,
	template: `
		<ng-container *ngFor="let value of unionOfArrays | unionArray">{{ value }}</ng-container>
	`,
})
class HostComponent {
	public readonly unionOfArrays: number[] | string[] = ["string", "-another"];
}

describe("UnionArrayPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ UnionArrayPipe ],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("convert union of arrays into array of unions", () => {
		const text = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(text).toEqual("string-another");
	});
});
