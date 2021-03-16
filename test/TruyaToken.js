var TruyaToken = artifacts.require("TruyaToken.sol");

contract('TruyaToken', function(accounts){
    var tokenInstance;

    it('Initializes the contract with the correct values', function(){
        return TruyaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'TruyaCoin', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'TYC', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, 'Truya Token v1.0', 'has the correct standard');
        })
    })

    it('allocates the initial supply upon deployment', function(){
        return TruyaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 100000000, 'checks to ensure that toal supply is 100 m');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 100000000, 'it allocates the initial supply to the admin account');
        })
    });

    it('transfers token ownership', function(){
        return TruyaToken.deployed().then(function(instance){
            tokenInstance = instance;
            //Test require statement first by tranferring something larger than senders balance
            return tokenInstance.transfer.call(accounts[1], 99999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            //the call method doesnt run a real transaction. It only gives us the return value
            return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]});
        }).then(function(success){
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        })        
        .then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');

            return tokenInstance.balanceOf(accounts[1])
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiveing account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 99750000, 'balance has been deducted');
        })
    })
})