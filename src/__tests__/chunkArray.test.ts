import chunkArray from "utils/chunkArray";

test("chunkArray", () => {
  const result = chunkArray([1, 2, 3, 4, 5], 2);
  expect(result).toEqual([[1, 2], [3, 4], [5]]);
});
