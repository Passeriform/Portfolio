import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { WorkDescriptionModel } from "./describe.interface";
import { DescribeComponent } from "./describe.component";

const describeModelMock: WorkDescriptionModel = {
	assets: [
		{
			resource: "https://site.com/screenshot.png",
			type: "IMAGE",
		}
	],
	brief: "brief",
	logo: "https://site.com/logo.png",
	subtitle: "subtitle",
	title: "title",
};

describe("DescribeComponent", () => {
	let component: Readonly<DescribeComponent>;
	let fixture: Readonly<ComponentFixture<DescribeComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ DescribeComponent ],
		});
		fixture = TestBed.createComponent(DescribeComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should show logo if present", () => {
		Object.defineProperty(component, "model", { value: describeModelMock });
		fixture.detectChanges();

		const logoContainer = fixture.debugElement.query(By.css("div#logo"));
		const logoImgElement = logoContainer.query(By.css("img"));

		expect(logoImgElement).toBeDefined();
		expect((logoImgElement.nativeElement as HTMLImageElement).src).toEqual("https://site.com/logo.png");
	});

	it("should fallback to title if logo isn’t present", () => {
		Object.defineProperty(component, "model", { value: { ...describeModelMock, logo: "" } });
		fixture.detectChanges();

		const logoContainer = fixture.debugElement.query(By.css("div#logo"));
		const logoImgElement = logoContainer.query(By.css("img"));
		const titleElement = logoContainer.query(By.css("h1"));

		expect(logoImgElement).toBeFalsy();
		expect(titleElement).toBeDefined();
		expect((titleElement.nativeElement as HTMLHeadingElement).textContent).toEqual("title");
	});

	it("should list all properties", () => {
		Object.defineProperty(component, "model", { value: describeModelMock });
		fixture.detectChanges();

		const briefElement = fixture.debugElement.query(By.css("div#text")).children[1]!;
		const subtitleElement = fixture.debugElement.query(By.css("div#logo")).query(By.css("p"));
		const screenshotElement = fixture.debugElement.query(By.css("div#screenshot")).query(By.css("img"));

		expect((briefElement.nativeElement as HTMLParagraphElement).textContent).toEqual("brief");
		expect((subtitleElement.nativeElement as HTMLParagraphElement).textContent).toEqual("subtitle");
		expect((screenshotElement.nativeElement as HTMLImageElement).src).toEqual("https://site.com/screenshot.png");
	});
});
