import { Injectable } from "@angular/core";

import type { WorkModel } from "../work.interface";
import { nonKeywords } from "./tagger.interface";

@Injectable()
export class TaggerService {
	public readonly getKeywords = (textstr: string): readonly string[] => {
		const keyArray = textstr.split(/[\s"(),./:;?\\\-]+/);

		return keyArray.filter(
			(key) => key && !nonKeywords.includes(key.toLowerCase()),
		);
	};

	public readonly appendTags = (modelList: readonly WorkModel[]): readonly WorkModel[] => modelList.map(
		(model: WorkModel) => {
			model.tags.push(
				model.type.toString(),
				...this.getKeywords(model.title),
				...this.getKeywords(model.subtitle),
				...this.getKeywords(model.description),
				...model.license.map((license) => license.toString()),
				...model.languages.map((language) => language.toString()),
				...model.frameworks.map((framework) => framework.toString()),
				...model.tools.map((tool) => tool.toString()),
			);

			return model;
		},
	);
}
