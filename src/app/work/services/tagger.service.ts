import { Injectable } from '@angular/core';

import { WorkModel } from '../work.interface';
import { nonKeywords } from './tagger.interface';

@Injectable()
export class TaggerService {
	constructor() { }

	getKeywords(textstr: string): string[] {
		const keyArr = textstr.split(/[\s,:/\\?\-;\(\).']+/);

		return keyArr.filter((key) =>
			key && !nonKeywords.includes(key.toLowerCase()));
	}

	appendTags(modelList: WorkModel[]): WorkModel[] {
		modelList.map((model) => {
			model.tags.push(
				model.type,
				...(this.getKeywords(model.title ?? '')),
				...(this.getKeywords(model.subtitle ?? '')),
				...(this.getKeywords(model.description ?? '')),
				...(model.license ?? []),
				...(model.languages ?? []),
				...(model.frameworks ?? []),
				...(model.tools ?? [])
			);
		});

		return modelList;
	}
}
