import type { GetPeopleQuery } from "@graphql/generated/schema";

type BaseAboutModel = NonNullable<GetPeopleQuery["peopleCollection"]>["edges"][number]["people"];

export type AboutModel = Omit<BaseAboutModel, "socialCollection"> & {
	socials: readonly {
		entity: NonNullable<BaseAboutModel["socialCollection"]>["edges"][number]["social"]["entity"];
		link: NonNullable<BaseAboutModel["socialCollection"]>["edges"][number]["social"]["link"];
	}[];
};
