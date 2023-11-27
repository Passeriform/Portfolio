import type { WithNonNullableArrayProperties } from "@shared/types/utility";
import type { GetAllWorkQuery } from "@graphql/generated/schema";

type BaseWorkModel = WithNonNullableArrayProperties<
	NonNullable<GetAllWorkQuery["workCollection"]>["edges"][number]["work"],
	"frameworks" | "languages" | "license" | "tags" | "tools"
>;

export type WorkModel = Omit<BaseWorkModel, "work_assetsCollection"> & {
	assets: readonly NonNullable<BaseWorkModel["work_assetsCollection"]>["edges"][number]["asset"][];
};

export type WorkTransformer = (cache: readonly WorkModel[]) => readonly WorkModel[];
