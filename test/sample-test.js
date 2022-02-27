const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("TournamentPrizePool", function() {
  it("Fee is correct contract locks tokens", async function () {
    const TournamentPrizePools = await ethers.getContractFactory("TournamentPrizePool");

    const tournamentPrizePool = await TournamentPrizePools.deploy()
    await tournamentPrizePool.deployed()

    expect(tournamentPrizePool._state === '')
    await tournamentPrizePool.start(2,8)

    await tournamentPrizePool.join({ value: ethers.utils.parseEther("2") })

  })
})