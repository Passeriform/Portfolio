import type { OperatorFunction } from "rxjs";
import { map } from "rxjs/operators";

export const pluck = <T, P extends keyof T>(property: P): OperatorFunction<T, T[P]> => map((value) => value[property]);
