const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const signer1 = await ethers.provider.getSigner(0);
    const address1 = await signer1.getAddress(0);
    const signer2 = await ethers.provider.getSigner(1);
    const address2 = await signer2.getAddress(1);

    return { game, signer1, address1, signer2, address2 };
  }
  it("should be a winner", async function () {
    const { game, signer1, address1, signer2, address2 } = await loadFixture(
      deployContractAndSetVariables
    );

    // nested mappings are rough :}

    await game.connect(signer1).write(address1);
    console.log(address1);
    console.log(await signer1.getAddress());

    await game.win(address1);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
