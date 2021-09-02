pragma solidity ^0.5.1;
import "./ERC20.sol";

contract XYZCoin is ERC20 {
    string _name;
    string _symbol;
    uint8 _decimals = 0;
    uint256 _totalSupply = 1000;

    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;

    constructor() public {
        _name = "XYZCoin";
        _symbol = "XTY";
        balances[msg.sender] = 1000;
    }

    function name() public view returns (string memory) {
        return(_name);
    }

    function symbol() public view returns (string memory) {
        return(_symbol);
    }

    function decimals() public view returns (uint8) {
        return(_decimals);
    }

    function totalSupply() public view returns (uint256) {
        return(_totalSupply);
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return(balances[_owner]);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        require(_to != address(0));

        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balances[_from] >= _value);
        require(allowed[_from][msg.sender] >= _value);
        require(_to != address(0));

        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        require(_spender != address(0));

        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

}
