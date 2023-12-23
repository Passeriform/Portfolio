import { TestBed } from "@angular/core/testing";

import { of } from "rxjs";

import { LoaderService } from "@app/loader/services/loader.service";
import type { GetAllWorkQuery } from "@graphql/generated/schema";
import { GetAllWorkGQL } from "@graphql/generated/schema";
import { expectedModel, workGQLModelMock } from "@mocks/graphql.mock";
import { setWorkSpyReturnValue } from "@mocks/mock.utility";

import { WorkService } from "./work.service";

// TODO: Try converting to ApolloTestingModule for better test writing experience and better coverage.

describe("WorkService", () => {
	let service: Readonly<WorkService>;
	let workSpy: Readonly<jasmine.SpyObj<GetAllWorkQuery["workCollection"]>>;

	beforeEach(() => {
		workSpy = jasmine.createSpyObj<GetAllWorkQuery["workCollection"]>("GetAllWorkGQL", [], [ "edges" ]);
		TestBed.configureTestingModule({
			providers: [
				// TODO: Move this mocking into a common place.
				// eslint-disable-next-line rxjs/finnish
				{ provide: GetAllWorkGQL, useValue: { watch: () => ({ valueChanges: of({ data: { workCollection: workSpy } }) }) } },
				WorkService,
				LoaderService,
			],
		});
		service = TestBed.inject(WorkService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should load work page with empty model data", (done: Readonly<DoneFn>) => {
		setWorkSpyReturnValue(workSpy, []);

		service.refreshCache$().subscribe();

		service.workCacheState$.subscribe((model) => {
			expect(model).toEqual([]);
			done();
		});
	});

	it("should load work page with mock model data", (done: Readonly<DoneFn>) => {
		setWorkSpyReturnValue(workSpy, workGQLModelMock);

		service.refreshCache$().subscribe();

		service.workCacheState$.subscribe((model) => {
			expect(model).toEqual(expectedModel);
			done();
		});
	});
});
