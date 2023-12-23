import { TestBed } from "@angular/core/testing";

import { lastValueFrom } from "rxjs";
import { reduce, take } from "rxjs/operators";

import { expectedLoaderOperations } from "@mocks/loader.mock";

import type { LoadingJob } from "./loader.service";
import { LoaderService } from "./loader.service";

describe("LoaderService", () => {
	let service: Readonly<LoaderService>;

	const getReducedStates = async (count: number): Promise<(readonly LoadingJob[])[]> => lastValueFrom(
		service.loadingJobsState$.pipe(
			take(count),
			reduce((accumulator, state) => [...accumulator, state], [] as LoadingJob[][]),
		),
	);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ LoaderService ],
		});
		service = TestBed.inject(LoaderService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should update loading jobs", (done: Readonly<DoneFn>) => {
		const operationCount = 6;

		getReducedStates(operationCount + 1).then((states) => {
			expect(states).toEqual(expectedLoaderOperations);
			done();
		});

		// Operations
		service.beginLoading("Task 1");
		service.beginLoading("Task 2");
		service.endLoading("Task 1");
		service.beginLoading("Task 3");
		service.endLoading("Task 3");
		service.endLoading("Task 2");
	});
});
