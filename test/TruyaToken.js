var TruyaToken = artifacts.require("TruyaToken.sol");

contract('TruyaToken', function(accounts){

    it('sets the total supply upon deployment', function(){
        return TruyaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(), 100000000, 'checks to ensure that toal supply is 100 m');
        })
    });
})