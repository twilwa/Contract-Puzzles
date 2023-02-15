const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    const signer = await ethers.provider.getSigner(0);

    return { game, signer };
  }
  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // good luck

    let randomWallet = ethers.Wallet.createRandom();
    let threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";

    while ((await randomWallet.getAddress()) > threshold) {
      randomWallet = ethers.Wallet.createRandom();
    }

    let tx = {
      to: randomWallet.address,
      value: ethers.utils.parseEther("20"),
    };

    await signer.sendTransaction(tx);
    let wallet = randomWallet.connect(ethers.provider);

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
