pragma solidity ^0.5.1;

contract TruyaToken {
    string public name = "TruyaCoin";
    string public symbol = "TYC";
    string public standard = "Truya Token v1.0";
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
   

    constructor(uint256 _initialSupply) public{
        balanceOf[msg.sender] = _initialSupply;
         totalSupply = _initialSupply;
    }

    //Transfer  
    
    function transfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        //transfer the balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        //call the tranfer event
        emit Transfer(msg.sender, _to, _value);

        //return boolean
        return true;
        
    }


   
}