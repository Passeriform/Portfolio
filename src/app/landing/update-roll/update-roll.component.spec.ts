import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { GithubService } from "./services/github.service";
import { UpdateRollComponent } from "./update-roll.component";

describe("UpdateRollComponent", () => {
	let component: Readonly<UpdateRollComponent>;
	let fixture: Readonly<ComponentFixture<UpdateRollComponent>>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
				UpdateRollComponent,
			],
			providers: [ GithubService ],
		});
		fixture = TestBed.createComponent(UpdateRollComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
