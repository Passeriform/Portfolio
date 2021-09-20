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
	readonly query: {
		readonly pages: readonly WikiResponsePage[];
	};
}
