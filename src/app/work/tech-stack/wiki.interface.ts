export interface WikiResponsePage {
	pageid: number;
	ns: number;
	title: string;
	description: string;
	descriptionsource: string;
	contentmodel: string;
	fullurl: string;
	editurl: string;
	canonicalurl: string;
	pagelanguage: string;
	pagelanguagehtmlcode: string;
	pagelanguagedir: string;
	touched: string;
	lastrevid: number;
	length: number;
}

export interface WikiResponseModel {
	batchcomplete: boolean;
	query: {
		pages: WikiResponsePage[];
	};
}
