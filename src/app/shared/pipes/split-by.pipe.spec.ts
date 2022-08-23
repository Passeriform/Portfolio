import { SplitByPipe } from "./splitBy.pipe";

describe("SplitByPipe", () => {
	it("create an instance", () => {
		const pipe = new SplitByPipe();
		expect(pipe).toBeTruthy();
	});
});
