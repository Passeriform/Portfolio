export const INIT_WIKI_RESPONSE_PAGE: WikiResponsePage = {
	canonicalurl: "",
	contentmodel: "",
	description: "No information available for this item.",
	descriptionsource: "",
	editurl: "",
	fullurl: "",
	lastrevid: 0,
	length: 0,
	ns: 0,
	pageid: 0,
	pagelanguage: "",
	pagelanguagedir: "",
	pagelanguagehtmlcode: "",
	title: "No information available",
	touched: "",
};

export type WikiResponsePage = Readonly<{
	canonicalurl: string;
	contentmodel: string;
	description: string;
	descriptionsource: string;
	editurl: string;
	fullurl: string;
	lastrevid: number;
	length: number;
	ns: number;
	pageid: number;
	pagelanguage: string;
	pagelanguagedir: string;
	pagelanguagehtmlcode: string;
	title: string;
	touched: string;
}>;

export type WikiResponseModel = Readonly<{
	batchcomplete: boolean;
	query?: Readonly<{
		pages?: readonly WikiResponsePage[];
	}>;
}>;

export type WikiEntry = Readonly<{
	description: string;
	href: string;
	title: string;
}>;
