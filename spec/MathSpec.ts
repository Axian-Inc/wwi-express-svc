import "jasmine";

describe("Math", () => {
  beforeEach(() => {
  });

  it("should be able to add 1 + 1", () => {
    expect(2).toBe(1 + 1);
  });

  it("should be able to subtract 1 - 1", () => {
    expect(0).toBe(1 - 1);
  });

  it("should be able to square 16", () => {
    expect(256).toBe(16*16);
  });
});
