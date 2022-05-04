import { capitalizeFirstLetter } from "./index"

describe("capitalizeFirstLetter", ()=>{
    it("should return a string with the first letter capitalized",()=>{
       const string = "pokemon is fun"
       const result = capitalizeFirstLetter(string)
       expect(result).toBe("hello")
    })

})