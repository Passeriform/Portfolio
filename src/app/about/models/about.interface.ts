import type { GetPeopleQuery } from "@graphql/generated/schema";

type BaseAboutModel = NonNullable<GetPeopleQuery["peopleCollection"]>["edges"][number]["people"];

export type AboutModel = Omit<BaseAboutModel, "socialCollection"> & {
	socials: readonly NonNullable<BaseAboutModel["socialCollection"]>["edges"][number]["social"][];
};
