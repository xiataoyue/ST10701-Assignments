const XYZCoin = artifacts.require("XYZCoin");

contract("XYZCoin", async accounts => {
    var tokenInstance;

    it("should set the token name correctly", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        assert.equal(await xyzCoinInstance.name(), "XYZCoin");
    });

    it("Token balance of the creator should equal totalSupply", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        assert.equal(await xyzCoinInstance.balanceOf(accounts[0]), 1000);
    });

    it("Token can be transferred using transfer() function", function() {
        return XYZCoin.deployed().then(function(instance){
            return instance.transfer(accounts[1], 10, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "an event was triggered");
            assert.equal(receipt.logs[0].event, "Transfer", "event type is correct");
            assert.equal(receipt.logs[0].args._to, accounts[1], "receiver is right");
            assert.equal(receipt.logs[0].args._value.toNumber(), 10, "value is correct");
        });
    });

    it("The allowance can be set and read", function() {
        return XYZCoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve(accounts[1], 10, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "the approve event is triggered");
            assert.equal(receipt.logs[0].event, "Approval", "the event type is correct");
            assert.equal(receipt.logs[0].args._spender, accounts[1], "spender is correct");
            assert.equal(receipt.logs[0].args._value.toNumber(), 10, "value is correct");
        });
    });

    it("Accounts can transfer tokens on behalf of other accounts",  function() {
        return XYZCoin.deployed().then(function(instance) {
            tokenInstance = instance;
            tokenInstance.approve(accounts[1], 10);
            return tokenInstance.transfer(accounts[2], 10, {from: accounts[0]});
        }).then(function(receipt) {
            assert(receipt.logs.length, 1, "an event is triggered");
            assert.equal(receipt.logs[0].event, "Transfer", "the event type is correct");
            assert.equal(receipt.logs[0].args._value, 10, "value is correct");
        });
    })
});