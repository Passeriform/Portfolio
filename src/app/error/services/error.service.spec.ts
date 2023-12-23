import { TestBed } from "@angular/core/testing";

import { ErrorService } from "./error.service";
import { ApiError } from "../models/error.interface";
import { HttpStatusCode } from "@angular/common/http";

describe("ErrorService", () => {
	let service: Readonly<ErrorService>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ ErrorService ],
		});
		service = TestBed.inject(ErrorService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should set error", (done: Readonly<DoneFn>) => {
		const apiError = new ApiError({
			message: "Error message",
			name: "ErrorName",
			status: HttpStatusCode.BadRequest,
			statusText: "Invalid header passed in request",
		});

		service.errorDetails$.subscribe((errorDetails) => {
			expect(errorDetails).toEqual(apiError);
			done();
		});

		service.setError(apiError);
	});
});
