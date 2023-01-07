import type { WorkModel } from "../models/work.interface";

export type TechStackModel = Pick<WorkModel, "frameworks" | "languages" | "tools">;
