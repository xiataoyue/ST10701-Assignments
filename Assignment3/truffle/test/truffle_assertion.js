const XYZCoin = artifacts.require("XYZCoin");
const truffleAssert = require("truffle-assertions");

contract("XYZCoin", async accounts => {
    var tokenInstance;

    it("Throws error when insufficient balance occurred", function() {
        return XYZCoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer(accounts[1], 10000, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1);
        });
    });

    it("accounts not authorized should revert the transaction", function() {
        return XYZCoin.deployed().then(function(instance) {
            tokenInstance = instance;
            truffleAssert.reverts(
                tokenInstance.transferFrom(accounts[1], accounts[2], 10, {from: accounts[0]}), "transaction reverted"
            );
        });
    });

    it("transfer() and transferFrom() should fire the Transfer event", async () => {
        tokenInstance = await XYZCoin.deployed();
        let tx = await tokenInstance.transfer(accounts[1], 0, {from: accounts[0]});
        truffleAssert.eventEmitted(tx, "Transfer");
        
    });

    it("approve() should fire the Approval event", async () => {
        tokenInstance = await XYZCoin.deployed();
        let tx = await tokenInstance.approve(accounts[1], 10, {from: accounts[0]});
        truffleAssert.eventEmitted(tx, "Approval");
    });
})