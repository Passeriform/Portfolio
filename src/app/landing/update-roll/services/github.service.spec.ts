import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { environment } from "@env/environment";
import { githubFeedMock } from "@mocks/github.mock";

import { GithubService } from "./github.service";

describe("GithubService", () => {
	let service: Readonly<GithubService>;
	let controller: Readonly<HttpTestingController>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [ GithubService ],
		});
		service = TestBed.inject(GithubService);
		controller = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		controller.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should refresh github feed", () => {
		service.refreshFeed();

		const requestObject = controller.expectOne(environment.githubEventsApiUrl);
		expect(requestObject.request.method).toEqual("GET");
		requestObject.flush(githubFeedMock);

		service.githubFeedState$.subscribe((feed) => {
			expect(feed).toEqual(githubFeedMock);
		});
	});
});
