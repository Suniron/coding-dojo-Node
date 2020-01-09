import * as fs from "fs";
import {
  getNumberFromNumber3x3,
  getnumbers3x3FromLines3x27,
  getLines3x27ArrayFromString,
  isValidChecksum
} from "../katas/bankocr-kata/bankOCR";
import { numbers } from "../katas/bankocr-kata/bankOCR.types";

const contentUseCase1 = fs.readFileSync(
  "./src/katas/bankocr-kata/accountsUseCase1.txt",
  "utf8"
);

describe("BankOCR Tests...", () => {
  describe("getNumberFromNumber3x3():", () => {
    // Check with goods args:
    for (let i = 0; i < 10; i++) {
      test(`Number 3x3 (${i}) should be ${i}`, () => {
        expect(getNumberFromNumber3x3(numbers[i].lines)).toBe(i);
      });
    }

    // TODO:Check with bads args:
    test("Bad number 3x3 should be falsy (= null)", () => {
      expect(
        getNumberFromNumber3x3({
          0: "   ",
          1: " _|",
          2: "|_ "
        })
      ).toBeFalsy;
    });
  });
  describe("getLines3x27ArrayFromString()", () => {
    test("Type of output[0] should be an array", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)).toBe(
        typeof []
      );
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0]).toBe(
        typeof []
      );
    });

    test("Type of output[0][0] should be string", () => {
      expect(typeof getLines3x27ArrayFromString(contentUseCase1)[0][0]).toBe(
        typeof ""
      );
    });
  });

  describe("getNumbers3x3FromLines3x27()", () => {
    const line = getLines3x27ArrayFromString(contentUseCase1)[10];

    test("Output length of valid input should be 9", () => {
      expect(getnumbers3x3FromLines3x27(line).length).toBe(9);
    });

    for (let i = 1; i < 10; i++) {
      test(`Output item n°${i} should be ok`, () => {
        expect(JSON.stringify(getnumbers3x3FromLines3x27(line)[i - 1])).toBe(
          JSON.stringify(numbers[i].lines)
        );
      });
    }
  });

  describe("isValidChecksum()", () => {
    test("Valid account should be truthy", () => {
      expect(isValidChecksum(345882865)).toBeTruthy();
    });

    test("Bad account should be falsy", () => {
      expect(1 + 1 === 3).toBeFalsy();
    });
  });
});
