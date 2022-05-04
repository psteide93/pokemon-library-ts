"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe("capitalizeFirstLetter", () => {
    it("should return a string with the first letter capitalized", () => {
        const string = "pokemon is fun";
        const result = (0, index_1.capitalizeFirstLetter)(string);
        expect(result).toBe("hello");
    });
});
