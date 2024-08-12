const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function() {

    let simpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue) 
    })
    it("Should be set to 31", async function() {
        await simpleStorage.store(31);
        const changedValue = await simpleStorage.retrieve()
        const expectedValue = "31"
        assert.equal(changedValue.toString(), expectedValue)
    })
    it("Should be add Person", async function() {
        await simpleStorage.addPerson("John", 25)
        const person = await simpleStorage.nameToFavoriteNumber("John")
        assert.equal(person.toString(), "25")
    })
    
})