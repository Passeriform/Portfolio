import { TestBed } from "@angular/core/testing";

import { of, zip } from "rxjs";

import { ErrorService } from "@app/error/services/error.service";
import { LoaderService } from "@app/loader/services/loader.service";
import type { GetSocialLinksQuery, GetTopPeopleQuery, GetTopWorksQuery } from "@graphql/generated/schema";
import { GetSocialLinksGQL, GetTopPeopleGQL, GetTopWorksGQL } from "@graphql/generated/schema";
import { socialLinksGQLModelMock, topPeopleGQLModelMock, topWorksGQLModelMock } from "@mocks/graphql.mock";
import { setSocialLinksSpyReturnValue, setTopPeopleSpyReturnValue, setTopWorksSpyReturnValue } from "@mocks/mock.utility";

import { FooterService } from "./footer.service";

type SocialLinksEdgeType = NonNullable<NonNullable<
	GetSocialLinksQuery["peopleCollection"]
>["edges"][number]["people"]["socialCollection"]>;

describe("FooterService", () => {
	let service: Readonly<FooterService>;
	let topWorksSpy: Readonly<jasmine.SpyObj<GetTopWorksQuery["workCollection"]>>;
	let topPeopleSpy: Readonly<jasmine.SpyObj<GetTopPeopleQuery["peopleCollection"]>>;
	let socialLinksSpy: Readonly<jasmine.SpyObj<SocialLinksEdgeType>>;

	beforeEach(() => {
		topWorksSpy = jasmine.createSpyObj<GetTopWorksQuery["workCollection"]>("GetTopWorksGQL", [], [ "edges" ]);
		topPeopleSpy = jasmine.createSpyObj<GetTopPeopleQuery["peopleCollection"]>("GetTopPeopleGQL", [], [ "edges" ]);
		socialLinksSpy = jasmine.createSpyObj<SocialLinksEdgeType>("GetSocialLinks", [], [ "edges" ]);
		TestBed.configureTestingModule({
			providers: [
				ErrorService,
				FooterService,
				// TODO: Move this mocking into a common place.
				/* eslint-disable rxjs/finnish */
				{ provide: GetTopWorksGQL, useValue: { watch: () => ({ valueChanges: of({ data: { workCollection: topWorksSpy } }) }) } },
				{
					provide: GetTopPeopleGQL,
					useValue: { watch: () => ({ valueChanges: of({ data: { peopleCollection: topPeopleSpy } }) }) },
				},
				{
					provide: GetSocialLinksGQL,
					useValue: { watch: () => ({ valueChanges: of({ data: {
						peopleCollection: { edges: [ { people: { socialCollection: socialLinksSpy } } ] },
					} }) }) },
				},
				/* eslint-enable rxjs/finnish */
				LoaderService,
			],
		});
		service = TestBed.inject(FooterService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should handle empty links on refresh", (done: Readonly<DoneFn>) => {
		setTopWorksSpyReturnValue(topWorksSpy, []);
		setTopPeopleSpyReturnValue(topPeopleSpy, []);
		setSocialLinksSpyReturnValue(socialLinksSpy, []);

		service.refreshLinks({ aboutCount: 1, socialCount: 2, workCount: 3 });

		zip(
			service.aboutEntriesState$,
			service.socialEntriesState$,
			service.workEntriesState$,
		).subscribe(([
			peopleEntries,
			socialEntries,
			workEntries,
		]) => {
			expect(peopleEntries).toEqual([]);
			expect(socialEntries).toEqual([]);
			expect(workEntries).toEqual([]);
			done();
		});
	});

	it("should handle mock links on refresh", (done: Readonly<DoneFn>) => {
		setTopWorksSpyReturnValue(topWorksSpy, topWorksGQLModelMock);
		setTopPeopleSpyReturnValue(topPeopleSpy, topPeopleGQLModelMock);
		setSocialLinksSpyReturnValue(socialLinksSpy, socialLinksGQLModelMock);

		service.refreshLinks({ aboutCount: 2, socialCount: 3, workCount: 2 });

		zip(
			service.aboutEntriesState$,
			service.socialEntriesState$,
			service.workEntriesState$,
		).subscribe(([
			peopleEntries,
			socialEntries,
			workEntries,
		]) => {
			expect(peopleEntries).toEqual(topPeopleGQLModelMock);
			expect(socialEntries).toEqual(socialLinksGQLModelMock);
			expect(workEntries).toEqual(topWorksGQLModelMock);
			done();
		});
	});
});
