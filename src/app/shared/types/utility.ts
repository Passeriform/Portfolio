export type WithNonNullableArrayProperties<T, U extends keyof T> = Omit<T, U> & {
	[K in U]: T[K] extends readonly unknown[] ? readonly NonNullable<T[K][number]>[] : never
};
