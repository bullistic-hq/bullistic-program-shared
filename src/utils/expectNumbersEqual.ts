import GenericNumber from "types/GenericNumber";
import genericNumberToNumber from "utils/genericNumberToNumber";

export default function expectNumbersEqual(
  num1: GenericNumber,
  num2: GenericNumber
): void {
  expect(genericNumberToNumber(num1)).toBe(genericNumberToNumber(num2));
}
