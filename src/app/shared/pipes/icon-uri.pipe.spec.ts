import { JsonPipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import type { ComponentFixture} from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { faAngular } from "@fortawesome/free-brands-svg-icons";

import { IconUriPipe } from "./icon-uri.pipe";

@Component({
	imports: [
		IconUriPipe,
		JsonPipe,
	],
	selector: "app-icon-uri-host",
	standalone: true,
	template: "{{ identifier | iconUri | json }}",
})
class HostComponent {
	public identifier = "angular";
}

describe("IconUriPipe", () => {
	let fixture: Readonly<ComponentFixture<HostComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				IconUriPipe,
			],
		});
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it("create an instance", () => {
		expect(fixture).toBeTruthy();
	});

	it("icon-uri specified keys", () => {
		const iconDetails = (fixture.debugElement.nativeElement as HTMLElement).textContent;
		expect(JSON.parse(iconDetails ?? "{}")).toEqual(faAngular);
	});
});
