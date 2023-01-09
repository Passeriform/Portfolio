import { UnionArrayPipe } from "./union-array.pipe";

describe("UnionArray", () => {
	it("create an instance", () => {
		const pipe = new UnionArrayPipe();
		expect(pipe).toBeTruthy();
	});
});
