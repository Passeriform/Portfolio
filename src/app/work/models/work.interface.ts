import type { WithNonNullableArrayProperties } from "@shared/types/utility";
import type { GetAllWorkQuery } from "@graphql/generated/schema";

type BaseWorkModel = WithNonNullableArrayProperties<
	NonNullable<GetAllWorkQuery["workCollection"]>["edges"][number]["work"],
	"tags"
>;

export type WorkModel = Omit<
	BaseWorkModel,
	"workAssets" | "workEntityMapping" | "workReferenceMapping"
> & {
	assets: readonly NonNullable<BaseWorkModel["workAssets"]>["edges"][number]["asset"][];
	licenses: readonly NonNullable<BaseWorkModel["workEntityMapping"]>["edges"][number]["entity"]["entity"][];
	techStack: readonly NonNullable<BaseWorkModel["workEntityMapping"]>["edges"][number]["entity"]["entity"][];
};

export type WorkTransformer = (cache: readonly WorkModel[]) => readonly WorkModel[];
