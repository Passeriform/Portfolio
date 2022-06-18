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

export interface WikiResponsePage {
	readonly canonicalurl: string;
	readonly contentmodel: string;
	readonly description: string;
	readonly descriptionsource: string;
	readonly editurl: string;
	readonly fullurl: string;
	readonly lastrevid: number;
	readonly length: number;
	readonly ns: number;
	readonly pageid: number;
	readonly pagelanguage: string;
	readonly pagelanguagedir: string;
	readonly pagelanguagehtmlcode: string;
	readonly title: string;
	readonly touched: string;
}

export interface WikiResponseModel {
	readonly batchcomplete: boolean;
	readonly query?: {
		readonly pages?: readonly WikiResponsePage[];
	};
}
